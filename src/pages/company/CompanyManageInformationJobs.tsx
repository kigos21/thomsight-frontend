import CompanyJobInformationFormItem from "../../components/ui/company/CompanyJobInformationFormItem";
import Button from "../../components/ui/Button";

import styles from "./CompanyManageInformationJobs.module.scss";

export default function CompanyManageInformationJobs() {
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
        tags=""
        jobDescription=""
      ></CompanyJobInformationFormItem>
    </div>
  );
}
