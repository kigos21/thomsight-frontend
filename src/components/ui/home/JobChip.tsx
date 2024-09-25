import { Job } from "../../../types/types";
import styles from "./JobChip.module.scss";

interface JobChipProps {
  job: Job;
}

const JobChip: React.FunctionComponent<JobChipProps> = ({ job }) => {
  return <div className={styles.chip}>{job.title}</div>;
};

export default JobChip;
