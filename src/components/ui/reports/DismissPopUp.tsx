import React from "react";
import styles from "./DismissPopUp.module.scss";
import { DismissPopUpProps } from "../../../types/props";

const DismissPopUp: React.FC<DismissPopUpProps> = ({
  isVisible,
  onClose,
  onDismiss,
  heading,
  details,
}) => {
  if (!isVisible) return null;

  return (
    <div className={styles.dismissPopUpOverlay}>
      <div className={styles.dismissPopUp}>
        <h2 className={styles.heading}>{heading}</h2>
        <p>{details}</p>
        <div className={styles.buttonGroup}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.dismissButton} onClick={onDismiss}>
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default DismissPopUp;

