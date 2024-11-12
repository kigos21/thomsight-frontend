import { useEffect, useState } from "react";
import PaddedContainer from "../../components/layout/PaddedContainer";
import StyledBox from "../../components/layout/StyledBox";
import CompanyAccountsItem from "../../components/ui/tokens/CompanyAccountsItem";
import SortButton from "../../components/ui/tokens/SortButton";
import { User } from "../../types/types";

import styles from "./AdminCompanyAccount.module.scss";
import axiosInstance from "../../services/axiosInstance";
import Spinner from "../../components/ui/Spinner";
import ValidationError from "../../components/form/ValidationError";
import SuccessMessage from "../../components/form/SuccessMessage";

export default function AdminCompanyAccount() {
  const [repUsers, setRepUsers] = useState<User[]>([]);
  const [filteredRepUsers, setFilteredRepUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchRepUsers = async () => {
      setLoading("Fetching company accounts...");
      try {
        const response = await axiosInstance.get("/api/users/role/rep");
        setRepUsers(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading("");
      }
    };

    fetchRepUsers();
  }, []);

  useEffect(() => {
    setFilteredRepUsers(repUsers);
  }, [repUsers]);

  const handleSoftDelete = async (
    companyId: number | undefined
  ): Promise<boolean> => {
    setError("");
    setSuccess("");
    try {
      setLoading("Deleting company...");
      await axiosInstance.patch(`/api/company/${companyId}/soft-delete`);
      setSuccess("Company soft deleted successfully.");
      setRepUsers((prevRepUsers) =>
        prevRepUsers.map((user) => {
          if (user.company && user.company.id === companyId) {
            return {
              ...user,
              company: {
                ...user.company,
                deleted_at: new Date(),
              },
            };
          }
          return user;
        })
      );
      return true;
    } catch (error) {
      console.error("Error soft deleting company:", error);
      setError("There was a problem deleting the company.");
      return false;
    } finally {
      setLoading("");
    }
  };

  const handleRestore = async (
    companyId: number | undefined
  ): Promise<boolean> => {
    setError("");
    setSuccess("");
    try {
      setLoading("Restoring company...");
      await axiosInstance.patch(`/api/company/${companyId}/restore`);
      setSuccess("Company restored successfully.");
      setRepUsers((prevRepUsers) =>
        prevRepUsers.map((user) => {
          if (user.company && user.company.id === companyId) {
            return {
              ...user,
              company: {
                ...user.company,
                deleted_at: null,
              },
            };
          }
          return user;
        })
      );
      return true;
    } catch (error) {
      console.error("Error restoring company:", error);
      setError("There was a problem restoring the company.");
      return false;
    } finally {
      setLoading("");
    }
  };

  const handleSort = (option: string) => {
    const updatedRepUsers = [...repUsers];
    let sortedUsers: User[] = [];

    switch (option) {
      case "Company Name":
        sortedUsers = updatedRepUsers.sort((a, b) =>
          (a.company?.name || "").localeCompare(b.company?.name || "")
        );
        break;
      case "Active":
        sortedUsers = updatedRepUsers.filter(
          (user) => !user.company?.deleted_at
        );
        break;
      case "Inactive":
        sortedUsers = updatedRepUsers.filter(
          (user) => !!user.company?.deleted_at
        );
        break;
      default:
        sortedUsers = updatedRepUsers;
        break;
    }

    setFilteredRepUsers(sortedUsers);
  };

  return (
    <PaddedContainer>
      <div className={styles.title}>
        <h1>Company Accounts</h1>
        {/* <SortButton classNames={styles.button}></SortButton> */}
        <SortButton onSort={handleSort}></SortButton>
      </div>
      {error && <ValidationError message={error} />}
      {success && <SuccessMessage message={success} />}
      {loading && <Spinner message={loading} />}

      <StyledBox
        classNames={styles.styledbox}
        paddedContainerClass={styles.childClass}
      >
        <div className={styles.companytokens}>
          <div className={styles.header}>
            <p className={styles.token}>Company Name</p>
            <p className={styles.status}>Status</p>
            <p className={styles.expiresIn}>Expires&nbsp;In</p>
            <p className={styles.company}>Email</p>
          </div>
          {filteredRepUsers.map((user) => (
            <>
              {user.company && (
                <CompanyAccountsItem
                  key={user.id}
                  status={user.company.deleted_at ? "inactive" : "active"}
                  companyName={user.company.name}
                  email={user.company.email}
                  expiration={user.company.expiration}
                  handleSoftDelete={handleSoftDelete}
                  handleRestore={handleRestore}
                  companyId={user.company.id}
                  isTrashed={user.company.deleted_at !== null}
                />
              )}
            </>
          ))}
        </div>
      </StyledBox>
    </PaddedContainer>
  );
}
