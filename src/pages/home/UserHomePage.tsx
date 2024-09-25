import { IconSearch } from "@tabler/icons-react";
import MultiSelect from "../../components/form/MultiSelect";
import PaddedContainer from "../../components/layout/PaddedContainer";
import HomeCompanyItem from "../../components/ui/home/HomeCompanyItem";
import Spinner from "../../components/ui/Spinner";

import styles from "./UserHomePage.module.scss";
import { useCompanies } from "../../contexts/CompaniesContext";

export default function UserHomePage() {
  const { companies, loading, error } = useCompanies();
  console.log(companies);

  if (loading)
    return <Spinner message="Please wait while we render relevant data!" />;
  if (error) return <div>{error}</div>;

  return (
    <PaddedContainer classNames={styles.container}>
      <div className={styles.filterSection}>
        <IconSearch className={styles.iconSearch} />
        <input
          type="text"
          placeholder="Keywords, Company"
          className={styles.searchBox}
        />
        <MultiSelect
          options={[
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" },
          ]}
          className={styles.jobClassification}
        />
      </div>

      <h1 className={styles.h1}>Companies</h1>

      {companies && (
        <div className={styles.itemContainer}>
          {companies.map((company) => (
            <HomeCompanyItem key={company.id} company={company} />
          ))}
        </div>
      )}
    </PaddedContainer>
  );
}
