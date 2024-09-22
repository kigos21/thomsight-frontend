import React from 'react';
import styles from "./DeletePopUp.module.scss";

const DeletePopUp: React.FC = () => {
  return (
    <div className={styles.deletePopUpOverlay}>
      <div className={styles.deletePopUp}>
        <h2 className={styles.heading}>Delete Post</h2>
        <p>Are you sure you want to delete this post?</p>
        <div className={styles.buttonGroup}>
        <button className={styles.deleteButton}>Delete</button>
          <button className={styles.cancelButton}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopUp;
