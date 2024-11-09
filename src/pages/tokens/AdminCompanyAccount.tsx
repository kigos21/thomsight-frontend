import { useEffect, useState } from "react";
import PaddedContainer from "../../components/layout/PaddedContainer";
import StyledBox from "../../components/layout/StyledBox";
import CompanyAccountsItem from "../../components/ui/tokens/CompanyAccountsItem";
import SortButton from "../../components/ui/tokens/SortButton";
import { User } from "../../types/types";

import styles from "./AdminCompanyAccount.module.scss";
import axiosInstance from "../../services/axiosInstance";
import Spinner from "../../components/ui/Spinner";

export default function AdminCompanyAccount() {
  const [repUsers, setRepUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<string>("");

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
  return (
    <PaddedContainer>
      <div className={styles.title}>
        <h1>Company Accounts</h1>
        {/* <SortButton classNames={styles.button}></SortButton> */}
        <SortButton
          onSort={(option: string) => console.log(option)}
        ></SortButton>
      </div>
      {loading && <Spinner message={loading} />}

      <StyledBox
        classNames={styles.styledbox}
        paddedContainerClass={styles.childClass}
      >
        <div className={styles.companytokens}>
          <div className={styles.header}>
            <p className={styles.token}>Token</p>
            <p className={styles.status}>Status</p>
            <p className={styles.expiresIn}>Expires&nbsp;In</p>
            <p className={styles.company}>Email</p>
          </div>
          {repUsers.map((user) => (
            <>
              <CompanyAccountsItem
                key={user.id}
                status="active"
                companyName="WTW Accenture Philippines Corporated, LLC"
                email="elijah.has.the.dept@gmail.com"
                expiration="1 month"
              />
            </>
          ))}
        </div>
      </StyledBox>
    </PaddedContainer>
  );
}
