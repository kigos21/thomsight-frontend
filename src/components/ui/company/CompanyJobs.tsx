import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Job } from "../../../pages/company/CompanyManageInformationJobs";

import styles from "./CompanyJobs.module.scss";

interface CompanyJobsProps {
  jobs: Job[];
}

const CompanyJobs: React.FunctionComponent<CompanyJobsProps> = ({ jobs }) => {
  return (
    <div className={styles.container}>
      {jobs.map((job) => (
        <div className={styles.jobItem}>
          <p className={styles.jobName}>{job.name}</p>
          <p className={styles.jobDescription}>{job.description}</p>

          <div className={styles.buttons}>
            <button className={styles.editButton}>
              <IconEdit />
            </button>
            <button className={styles.deleteButton}>
              <IconTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompanyJobs;
