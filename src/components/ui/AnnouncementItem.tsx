import { AnnouncementItemProps } from "../../types/props";
import StyledBox from "../layout/StyledBox";
import { IconTrash, IconEdit } from "@tabler/icons-react";

import styles from "./AnnouncementItem.module.scss";

export default function AnnouncementItem({
  classNames,
  style,
  announcementHeader,
  date,
  announcementDescription,
}: AnnouncementItemProps) {
  const handleIconClick = () => {
    //click handling logic
    console.log("Icon clicked!");
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
            <IconEdit size={25} stroke={1.5} className={styles.iconEdit} />
          </button>
          <button onClick={handleIconClick} className={styles.iconButton}>
            <IconTrash size={25} stroke={1.5} className={styles.iconDelete} />
          </button>
        </div>
      </div>
      <StyledBox paddedContainerClass={styles.styledBox}>
        <p className={styles.description}>{announcementDescription}</p>
      </StyledBox>
    </div>
  );
}
