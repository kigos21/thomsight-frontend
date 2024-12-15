import { useEffect, useState } from "react";
import PaddedContainer from "../../components/layout/PaddedContainer";
import StyledBox from "../../components/layout/StyledBox";
import CompanyAccountsItem from "../../components/ui/tokens/CompanyAccountsItem";
import SortButton from "../../components/ui/tokens/SortButton";
import { User } from "../../types/types";

import styles from "./AdminCompanyAccount.module.scss";
import axiosInstance from "../../services/axiosInstance";
import Spinner from "../../components/ui/Spinner";
import { toast } from "react-toastify";
import { useCompanies } from "../../contexts/CompaniesContext";

export default function AdminCompanyAccount() {
  const [repUsers, setRepUsers] = useState<User[]>([]);
  const [filteredRepUsers, setFilteredRepUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<string>("");
  const { loadCompanies, loadJobs } = useCompanies();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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

  const totalPages = Math.ceil(filteredRepUsers.length / itemsPerPage);
  const paginatedRepUsers = filteredRepUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSoftDelete = async (
    companyId: number | undefined
  ): Promise<boolean> => {
    try {
      setLoading("Deleting company...");
      await axiosInstance.patch(`/api/company/${companyId}/soft-delete`);
      loadCompanies();
      loadJobs();
      toast.success("Company soft deleted successfully.");
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
      toast.error("There was a problem deleting the company.");
      return false;
    } finally {
      setLoading("");
    }
  };

  const handleRestore = async (
    companyId: number | undefined
  ): Promise<boolean> => {
    try {
      setLoading("Restoring company...");
      await axiosInstance.patch(`/api/company/${companyId}/restore`);
      loadCompanies();
      loadJobs();
      toast.success("Company restored successfully.");
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
      toast.error("There was a problem restoring the company.");
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
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePageSelect = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Company Accounts</h1>
        {/* <SortButton classNames={styles.button}></SortButton> */}
        <SortButton onSort={handleSort}></SortButton>
      </div>
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
          {paginatedRepUsers.map((user) => (
            <>
              {user.company && (
                <CompanyAccountsItem
                  key={user.id}
                  status={user.company.deleted_at ? "inactive" : "active"}
                  companyName={user.company.name}
                  email={user.email}
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

        {filteredRepUsers.length > itemsPerPage && (
          <div className={styles.pagination}>
            <button
              className={`${styles.paginationButton} ${currentPage === 1 ? styles.disabled : ""}`}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              &#60; Previous
            </button>
            <button
              className={`${styles.paginationButton} ${currentPage === 1 ? styles.disabled : ""}`}
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              First
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1)
              .slice(
                Math.max(currentPage - 2, 0),
                Math.min(currentPage + 1, totalPages)
              )
              .map((page) => (
                <button
                  key={page}
                  className={`${styles.paginationButton} ${currentPage === page ? styles.active : ""}`}
                  onClick={() => handlePageSelect(page)}
                >
                  {page}
                </button>
              ))}

            <button
              className={`${styles.paginationButton} ${currentPage === totalPages ? styles.disabled : ""}`}
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </button>
            <button
              className={`${styles.paginationButton} ${currentPage === totalPages ? styles.disabled : ""}`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next &#62;
            </button>
          </div>
        )}
      </StyledBox>
    </PaddedContainer>
  );
}
