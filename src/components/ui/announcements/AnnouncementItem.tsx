// import { AnnouncementItemProps } from "../../../types/props";
import StyledBox from "../../layout/StyledBox";
import { IconTrash, IconEdit } from "@tabler/icons-react";
import { useState } from "react";

import styles from "./AnnouncementItem.module.scss";
import DeletePopUp from "../company/DeletePopUp";

export default function AnnouncementItem({
  classNames,
  style,
  announcementHeader,
  date,
  announcementDescription,
  id,
  onDelete,
}: any) {
  const [isDeletePopupVisible, setDeletePopupVisible] = useState(false);

  const handleIconClick = () => {
    console.log("Icon clicked!");
  };

  const handleDeleteClick = () => {
    setDeletePopupVisible(true);
  };

  const handleDelete = async () => {
    try {
      await onDelete(id);
      setDeletePopupVisible(false);
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  return (
    <div className={`${styles.container} ${classNames}`} style={{ ...style }}>
      <div className={styles.detailsContainer}>
        <div className={styles.detailsHeaderContainer}>
          <p className={styles.header}>{announcementHeader}</p>
          <p className={styles.date}>{date}</p>
        </div>
        <div className={styles.iconContainer}>
          <button onClick={handleIconClick} className={styles.iconButton}>
            <IconEdit className={styles.iconEdit} />
          </button>
          <button onClick={handleDeleteClick} className={styles.iconButton}>
            <IconTrash className={styles.iconDelete} />
          </button>
        </div>
      </div>
      <StyledBox paddedContainerClass={styles.styledBox}>
        <p className={styles.description}>{announcementDescription}</p>
      </StyledBox>

      <DeletePopUp
        isVisible={isDeletePopupVisible}
        onClose={() => setDeletePopupVisible(false)}
        onDelete={handleDelete}
        heading="Delete Announcement"
        details="Are you sure you want to delete this announcement?"
      />
    </div>
  );
}
