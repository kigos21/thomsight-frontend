import { IconEdit, IconTrash } from "@tabler/icons-react";

import styles from "./CompanyJobs.module.scss";
import { Job } from "../../../types/types";

interface CompanyJobsProps {
  jobs: Job[];
}

const CompanyJobs: React.FunctionComponent<CompanyJobsProps> = ({ jobs }) => {
  return (
    <div className={styles.container}>
      {jobs.map((job) => (
        <div className={styles.jobItem}>
          <p className={styles.jobName}>{job.title}</p>
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
