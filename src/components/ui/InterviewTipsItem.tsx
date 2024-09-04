import { InterviewTipsItemProps } from "../../types/props";
import PaddedContainer from "../layout/PaddedContainer";
import { IconFlagFilled, IconTrash, IconEdit } from "@tabler/icons-react";

import styles from "./InterviewTipsItem.module.scss";

export default function InterviewTipsItem({
  classNames,
  style,
  subjectHeading,
  internName,
  tipDescription,
}: InterviewTipsItemProps) {
  const handleIconClick = () => {
    //click handling logic
    console.log("Icon clicked!");
  };

  return (
    <div className={`${styles.container} ${classNames}`} style={{ ...style }}>
      <PaddedContainer classNames={styles.paddedContainer}>
        <div className={styles.tipsDetailsContainer}>
          <div className={styles.tipsSubjectContainer}>
            <p className={styles.subjectHeading}>{subjectHeading}</p>
            <p className={styles.internName}>{internName}</p>
          </div>
          <p className={styles.jobDescription}>{tipDescription}</p>
          <div className={styles.iconContainer}>
            <button onClick={handleIconClick} className={styles.iconButton}>
              <IconEdit size={25} stroke={1.5} className={styles.iconEdit} />
            </button>
            <button onClick={handleIconClick} className={styles.iconButton}>
              <IconTrash size={25} stroke={1.5} className={styles.iconDelete} />
            </button>
            <button onClick={handleIconClick} className={styles.iconButton}>
              <IconFlagFilled
                size={25}
                stroke={1.5}
                className={styles.iconReport}
              />
            </button>
          </div>
        </div>
      </PaddedContainer>
    </div>
  );
}
