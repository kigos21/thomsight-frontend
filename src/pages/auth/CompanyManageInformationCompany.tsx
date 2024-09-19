import CompanyOverviewDescriptionItem from "../../components/ui/CompanyOverviewDescriptionItem";
import CompanyLocationItem from "../../components/ui/CompanyLocationItem";

import styles from "./CompanyManageInformationCompany.module.scss";

export default function CompanyManageInformationCompany() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Company Information</h2>
      </div>
      <CompanyOverviewDescriptionItem companyDescription="This is the description"></CompanyOverviewDescriptionItem>

      <CompanyLocationItem location="Makati, Philippines"></CompanyLocationItem>
    </div>
  );
}
