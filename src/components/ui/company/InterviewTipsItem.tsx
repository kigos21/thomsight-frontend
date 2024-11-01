import { IconFlagFilled, IconTrash, IconEdit } from "@tabler/icons-react";
import PaddedContainer from "../../layout/PaddedContainer";
import styles from "./InterviewTipsItem.module.scss";

export interface InterviewTipsItemProps {
  id?: number;
  classNames?: string;
  style?: React.CSSProperties;
  subjectHeading: string;
  internName?: string;
  tipDescription: string;
  onTipChange?: (updatedTip: { title: string; description: string }) => void;
  onTipDelete?: (id: number | undefined) => void;
  setSuccess?: (message: string) => void;
  setError?: (message: string) => void;
}

export default function InterviewTipsItem({
  id,
  classNames,
  style,
  subjectHeading,
  internName,
  tipDescription,
  onTipChange,
  onTipDelete,
  // setSuccess,
  // setError,
}: InterviewTipsItemProps) {
  const handleEdit = () => {
    if (onTipChange) {
      // You might want to add a modal or form here to get the updated values
      onTipChange({
        title: subjectHeading,
        description: tipDescription,
      });
    }
  };

  const handleDelete = () => {
    if (onTipDelete) {
      onTipDelete(id);
    }
  };

  const handleReport = () => {
    // Implement report functionality
    console.log("Report clicked for tip:", id);
  };

  return (
    <div className={`${styles.container} ${classNames || ""}`} style={style}>
      <PaddedContainer classNames={styles.paddedContainer}>
        <div className={styles.tipsDetailsContainer}>
          <div className={styles.tipsSubjectContainer}>
            <p className={styles.subjectHeading}>{subjectHeading}</p>
            {internName && <p className={styles.internName}>{internName}</p>}
          </div>
          <p className={styles.jobDescription}>{tipDescription}</p>
          <div className={styles.iconContainer}>
            {onTipChange && (
              <button onClick={handleEdit} className={styles.iconButton}>
                <IconEdit size={25} stroke={1.5} className={styles.iconEdit} />
              </button>
            )}
            {onTipDelete && (
              <button onClick={handleDelete} className={styles.iconButton}>
                <IconTrash
                  size={25}
                  stroke={1.5}
                  className={styles.iconDelete}
                />
              </button>
            )}
            <button onClick={handleReport} className={styles.iconButton}>
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
