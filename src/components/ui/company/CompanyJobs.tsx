import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Job } from "../../../types/types";

import styles from "./CompanyJobs.module.scss";

interface CompanyJobsProps {
  jobs: Job[];
  onEdit: (job: Job) => void;
  onDelete: (id: number) => void;
}

const CompanyJobs: React.FunctionComponent<CompanyJobsProps> = ({
  jobs,
  onEdit,
  onDelete,
}) => {
  return (
    <div className={styles.container}>
      {jobs.map((job) => (
        <div className={styles.jobItem}>
          <p className={styles.jobName}>{job.title}</p>
          <p className={styles.jobDescription}>{job.description}</p>

          <div className={styles.buttons}>
            <button className={styles.editButton} onClick={() => onEdit(job)}>
              <IconEdit />
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => onDelete(job.id)}
            >
              <IconTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompanyJobs;
