import React from "react";
import styles from "./DisplayProfile.module.scss";
import { DisplayProfileProps } from "../../../types/props";

const DisplayProfile: React.FC<DisplayProfileProps> = ({
  isVisible,
  onClose,
  firstName,
  lastName,
  bio,
  profileLink,
  phoneNumber,
  email,
}) => {
  if (!isVisible) return null;

  return (
    <div className={styles.profileOverlay}>
      <div className={styles.profilePopup}>
        <h2 className={styles.heading}>
          {firstName} {lastName}
        </h2>
        <p><strong>Bio:</strong> {bio}</p>
        <p><strong>Profile Link:</strong> <a href={profileLink}>{profileLink}</a></p>
        <p><strong>Phone Number:</strong> {phoneNumber}</p>
        <p><strong>Email:</strong> {email}</p>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default DisplayProfile;
