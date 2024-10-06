import { JobItemProps } from "../../../types/props";
import PaddedContainer from "../../layout/PaddedContainer";

import styles from "./JobItem.module.scss";

export default function JobItem({
  classNames,
  style,
  jobTitle,
  jobDescription,
}: JobItemProps) {
  return (
    <div className={`${styles.container} ${classNames}`} style={{ ...style }}>
      <PaddedContainer classNames={styles.paddedContainer}>
        <div className={styles.jobDetailsContainer}>
          <div className={styles.jobSubjectContainer}>
            <p className={styles.jobTitle}>{jobTitle}</p>
          </div>
          <p className={styles.jobDescription}>{jobDescription}</p>
        </div>
      </PaddedContainer>
    </div>
  );
}
