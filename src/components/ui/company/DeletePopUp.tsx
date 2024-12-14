import React from "react";
import styles from "./DeletePopUp.module.scss";
import Button from "../Button";

interface DeletePopUpProps {
  isVisible: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
  heading: string;
  details: string;
}

const DeletePopUp: React.FC<DeletePopUpProps> = ({
  isVisible,
  onClose,
  onDelete,
  heading,
  details,
}) => {
  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2 className={styles.title}>{heading}</h2>
        <div className={styles.separator}></div>
        <p className={styles.details}>{details}</p>
        <div className={styles.buttonContainer}>
          <Button classNames={styles.cancelButton} onClick={onClose}>
            Cancel
          </Button>
          <Button classNames={styles.deleteButton} onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopUp;
