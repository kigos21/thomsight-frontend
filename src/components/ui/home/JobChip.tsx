import styles from "./JobChip.module.scss";

interface JobChipProps {
  job: string;
}

const JobChip: React.FunctionComponent<JobChipProps> = ({ job }) => {
  return <div className={styles.chip}>{job}</div>;
};

export default JobChip;
