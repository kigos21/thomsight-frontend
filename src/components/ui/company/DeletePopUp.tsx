import React from "react";
import styles from "./DeletePopUp.module.scss";
import { DeletePopUpProps } from "../../../types/props";

const DeletePopUp: React.FC<DeletePopUpProps> = ({
  isVisible,
  onClose,
  onDelete,
  heading,
  details,
}) => {
  if (!isVisible) return null;

  return (
    <div className={styles.deletePopUpOverlay}>
      <div className={styles.deletePopUp}>
        <h2 className={styles.heading}>{heading}</h2>
        <p>{details}</p>
        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.deleteButton} onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopUp;
