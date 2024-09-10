import PaddedContainer from "../../components/layout/PaddedContainer";
import AnnouncementItem from "../../components/ui/AnnouncementItem";
import Button from "../../components/ui/Button";
import { IconPlus } from "@tabler/icons-react";

import styles from "./AdminViewAnnouncements.module.scss";

export default function AdminViewAnnouncements() {
  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Announcements</h2>
          <Button
            classNames={styles.announcementButton}
            color="secondary"
            roundness="rounded"
          >
            <IconPlus size={25} stroke={1.5} className={styles.iconPlus} />
            Create Announcement
          </Button>
        </div>
        <AnnouncementItem
          announcementHeader="Announcement title"
          date="1/17/2024"
          announcementDescription="this is the announcement for today"
        ></AnnouncementItem>
      </div>
    </PaddedContainer>
  );
}
