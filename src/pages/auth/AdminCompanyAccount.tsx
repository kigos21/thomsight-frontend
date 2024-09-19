import PaddedContainer from "../../components/layout/PaddedContainer";
import StyledBox from "../../components/layout/StyledBox";
import ButtonWithDropdown from "../../components/ui/ButtonWithDropdown";
import CompanyAccountsItem from "../../components/ui/CompanyAccountsItem";

import styles from "./AdminCompanyAccount.module.scss";

export default function AdminCompanyAccount() {
  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      <div className={styles.title}>
        <h1>Company Accounts</h1>
        <ButtonWithDropdown classNames={styles.button}></ButtonWithDropdown>
      </div>

      <StyledBox classNames={styles.styledBox}>
        <div className={styles.companyTokens}>
          <div className={styles.header}>
            <p>Token</p>
            <p>Status</p>
            <p>Expires In</p>
            <p>Company</p>
          </div>
          <CompanyAccountsItem
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
          />
        </div>
      </StyledBox>
    </PaddedContainer>
  );
}
