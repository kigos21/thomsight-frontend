import { JobItemProps } from "../../types/props";
import PaddedContainer from "./PaddedContainer";

import styles from "./JobItem.module.scss";

export default function JobItem({
  classNames,
  style,
  jobTitle,
  companyName,
  jobDescription,
}: JobItemProps) {
  return (
    <div className={`${styles.container} ${classNames}`} style={{ ...style }}>
      <PaddedContainer classNames={styles.paddedContainer}>
        <h2 className={styles.jobTitle}>{jobTitle}</h2>
        <h3 className={styles.companyName}>{companyName}</h3>
        <p className={styles.jobDescription}>{jobDescription}</p>
      </PaddedContainer>
    </div>
  );
}
