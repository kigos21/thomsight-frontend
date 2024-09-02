import { InterviewTipsItemProps } from "../../types/props";
import PaddedContainer from "./PaddedContainer";

import styles from "./InterviewTipsItem.module.scss";

export default function InterviewTipsItem({
  classNames,
  style,
  subjectHeading,
  internName,
  tipDescription,
}: InterviewTipsItemProps) {
  return (
    <div className={`${styles.container} ${classNames}`} style={{ ...style }}>
      <PaddedContainer classNames={styles.paddedContainer}>
        <div className={styles.tipsDetailsContainer}>
          <div className={styles.tipsSubjectContainer}>
            <p className={styles.subjectHeading}>{subjectHeading}</p>
            <p className={styles.internName}>{internName}</p>
          </div>
          <p className={styles.jobDescription}>{tipDescription}</p>
        </div>
      </PaddedContainer>
    </div>
  );
}
