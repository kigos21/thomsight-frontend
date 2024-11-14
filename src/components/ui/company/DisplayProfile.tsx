import React, { useEffect, useState } from "react";
import styles from "./DisplayProfile.module.scss";
import { DisplayProfileProps } from "../../../types/props";
import axiosInstance from "../../../services/axiosInstance";
import Spinner from "../Spinner";

export const DisplayProfile: React.FC<DisplayProfileProps> = ({
  isVisible,
  onClose,
  user_id,
  // internName,
  // bio,
  // // profileLink,
  // // phoneNumber,
  // email,
}) => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isVisible) return;

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/api/user/profile/${user_id}`
        );
        setProfile(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isVisible, user_id]);

  if (!profile) {
    return null;
  }

  return (
    <div className={styles.profileOverlay}>
      {loading && <Spinner />}
      <div className={styles.profilePopup}>
        <h2 className={styles.heading}>{profile.name}</h2>
        {profile.email && (
          <p className={styles.paragraph}>
            <strong>Email:</strong> {profile.email}
          </p>
        )}
        {profile.phone_number && (
          <p className={styles.paragraph}>
            <strong>Phone Number:</strong> {profile.phone_number}
          </p>
        )}
        {profile.bio && (
          <p className={styles.bio}>
            {/* <strong>Bio:</strong> {profile.bio} */}"{profile.bio}"
          </p>
        )}
        {/* <p>
          <strong>Profile Link:</strong> <a href={profileLink}>{profileLink}</a>
        </p> */}
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default DisplayProfile;
