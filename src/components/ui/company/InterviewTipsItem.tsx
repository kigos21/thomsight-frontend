import { IconFlagFilled, IconTrash, IconEdit } from "@tabler/icons-react";
import PaddedContainer from "../../layout/PaddedContainer";
import styles from "./InterviewTipsItem.module.scss";
import { useState } from "react";
import DeletePopUp from "./DeletePopUp";
import axiosInstance from "../../../services/axiosInstance";
import { useParams } from "react-router-dom";

export interface InterviewTipsItemProps {
  id?: number;
  classNames?: string;
  style?: React.CSSProperties;
  subjectHeading: string;
  internName?: string;
  tipDescription: string;
  onTipChange?: (updatedTip: { title: string; description: string }) => void;
  onTipDelete?: (id: number | undefined) => void;
  setSuccess: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<string>>;
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
  setSuccess,
  setError,
  setLoading,
}: InterviewTipsItemProps) {
  const { slug } = useParams<{ slug: string }>();
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);

  const handleEdit = () => {
    if (onTipChange) {
      // You might want to add a modal or form here to get the updated values
      onTipChange({
        title: subjectHeading,
        description: tipDescription,
      });
    }
  };

  const handleDeleteClick = () => {
    setSuccess("");
    setError("");
    setShowDeletePopup(true);
  };

  const handleDelete = async () => {
    try {
      setLoading("Deleting interview tip...");
      await axiosInstance.delete(`/api/company/${slug}/tip/${id}/delete`);
      if (onTipDelete) {
        onTipDelete(id);
      }
      setSuccess("Deleted interview tip successfully");
    } catch (err) {
      console.error("Error deleting interview tip:" + err);
      setError("Could not delete interview tip. Please try again.");
    } finally {
      setLoading("");
      setShowDeletePopup(false);
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
              <button onClick={handleDeleteClick} className={styles.iconButton}>
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

        {showDeletePopup && (
          <DeletePopUp
            isVisible={showDeletePopup}
            onClose={() => setShowDeletePopup(false)}
            onDelete={handleDelete}
            heading="Delete Interview Tip"
            details="Are you sure you want to delete this interview tip?"
          />
        )}
      </PaddedContainer>
    </div>
  );
}
