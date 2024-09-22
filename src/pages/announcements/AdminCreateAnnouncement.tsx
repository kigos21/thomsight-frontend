import PaddedContainer from "../../components/layout/PaddedContainer";
import AdminCreatennouncementItem from "../../components/ui/announcements/AdminCreateAnnouncementItem";

import styles from "./AdminCreateAnnouncement.module.scss";

export default function AdminCreateAnnouncement() {
  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      <div className={styles.container}>
        <AdminCreatennouncementItem
          subject=""
          details=""
        ></AdminCreatennouncementItem>
      </div>
    </PaddedContainer>
  );
}
