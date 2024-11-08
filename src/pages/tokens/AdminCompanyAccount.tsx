import { useEffect, useState } from "react";
import PaddedContainer from "../../components/layout/PaddedContainer";
import StyledBox from "../../components/layout/StyledBox";
import CompanyAccountsItem from "../../components/ui/tokens/CompanyAccountsItem";
import SortButton from "../../components/ui/tokens/SortButton";
import { User } from "../../types/types";

import styles from "./AdminCompanyAccount.module.scss";
import axiosInstance from "../../services/axiosInstance";

export default function AdminCompanyAccount() {
  const [repUsers, setRepUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepUsers = async () => {
      setLoading("Fetching company accounts...");
      try {
        const response = await axiosInstance.get("/api/users/role/rep");
        setRepUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users");
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

      <StyledBox classNames={styles.styledbox}>
        <div className={styles.companytokens}>
          <div className={styles.header}>
            <p className={styles.token}>Company</p>
            <p className={styles.status}>Status</p>
            <p className={styles.expiresIn}>Expires In</p>
            <p className={styles.company}>Company</p>
          </div>
          {repUsers.map((user) => (
            <CompanyAccountsItem
              key={user.id}
              token="X7pL9kFg"
              status="active"
              expiration="1 month"
            />
          ))}
          {/* <CompanyAccountsItem
            token="X7pL9kFg"
            status="active"
            expiration="1 month"
          />
          <CompanyAccountsItem
            token="X7pL9kFg"
            status="inactive"
            expiration="4 month"
          />
          <CompanyAccountsItem
            token="X7pL9kFg"
            status="expiring"
            expiration="6 month"
          />
          <CompanyAccountsItem
            token="X7pL9kFg"
            status="active"
            expiration="10 month"
          />
          <CompanyAccountsItem
            token="X7pL9kFg"
            status="active"
            expiration="13 month"
          />
          <CompanyAccountsItem
            token="X7pL9kFg"
            status="active"
            expiration="16 month"
          />
          <CompanyAccountsItem
            token="X7pL9kFg"
            status="active"
            expiration="1 month"
          />
          <CompanyAccountsItem
            token="X7pL9kFg"
            status="active"
            expiration="1 month"
          />
          <CompanyAccountsItem
            token="X7pL9kFg"
            status="active"
            expiration="1 month"
          />
          <CompanyAccountsItem
            token="X7pL9kFg"
            status="active"
            expiration="1 month"
          /> */}
        </div>
      </StyledBox>
    </PaddedContainer>
  );
}
