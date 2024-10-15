import { IconEdit, IconTrash } from "@tabler/icons-react";

import styles from "./CompanyJobs.module.scss";
import { Job } from "../../../types/types";

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
              <IconEdit className={styles.iconEdit} />
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => onDelete(job.id)}
            >
              <IconTrash className={styles.iconDelete} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompanyJobs;
