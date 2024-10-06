import CompanyJobInformationFormItem from "../../components/ui/company/CompanyJobInformationFormItem";
import Button from "../../components/ui/Button";

import styles from "./CompanyManageInformationJobs.module.scss";
import CompanyJobs from "../../components/ui/company/CompanyJobs";
import { useParams } from "react-router-dom";
import { useCompanies } from "../../contexts/CompaniesContext";
import { Job } from "../../types/types";

export default function CompanyManageInformationJobs() {
  const { slug } = useParams<{ slug: string }>();
  const { getCompanyBySlug } = useCompanies();
  const company = getCompanyBySlug(slug || "");
  const jobs: Job[] = company?.jobs || [];

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2>Job Information</h2>
        <Button
          classNames={styles.addJobButton}
          color="secondary"
          roundness="rounded"
        >
          Add Job
        </Button>
      </div>

      <CompanyJobInformationFormItem
        jobTitle=""
        jobDescription=""
      ></CompanyJobInformationFormItem>

      <CompanyJobs jobs={jobs} />
    </div>
  );
}
