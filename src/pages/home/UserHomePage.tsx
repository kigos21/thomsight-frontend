import { IconSearch } from "@tabler/icons-react";
import MultiSelect from "../../components/form/MultiSelect";
import PaddedContainer from "../../components/layout/PaddedContainer";
import HomeCompanyItem from "../../components/ui/home/HomeCompanyItem";
import Spinner from "../../components/ui/Spinner";
import { useState } from "react";

import styles from "./UserHomePage.module.scss";
import { useCompanies } from "../../contexts/CompaniesContext";

export default function UserHomePage() {
  const { companies, jobs, loading, error } = useCompanies();
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const jobOptions = jobs
    ? jobs.map((job) => ({ label: job.title, value: job.title }))
    : [];

  if (loading)
    return <Spinner message="Please wait while we render relevant data!" />;
  if (error) return <div>{error}</div>;

  const handleJobSelect = (selected: string[]) => {
    setSelectedJobs(selected);
  };

  const filteredCompanies =
    selectedJobs.length > 0 && companies
      ? companies.filter(
          (company) =>
            company.jobs?.some((job) => selectedJobs.includes(job.title)) &&
            company.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : companies?.filter((company) =>
          company.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) || [];

  return (
    <PaddedContainer classNames={styles.container}>
      <div className={styles.filterSection}>
        <IconSearch className={styles.iconSearch} />
        <input
          type="text"
          placeholder="Keywords, Company"
          className={styles.searchBox}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <MultiSelect
          options={jobOptions}
          className={styles.jobClassification}
          onChange={handleJobSelect}
        />
      </div>

      <h1 className={styles.h1}>Companies</h1>

      {filteredCompanies && (
        <div className={styles.itemContainer}>
          {filteredCompanies.map((company) => (
            <HomeCompanyItem key={company.id} company={company} />
          ))}
        </div>
      )}
    </PaddedContainer>
  );
}
