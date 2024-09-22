import { NotificationItemProps } from "../../../types/props";
import PaddedContainer from "../../layout/PaddedContainer";

import styles from "./NotificationItem.module.scss";

export default function NotificationItem({
  classNames,
  style,
  notificationHeader,
  notificationDescription,
}: NotificationItemProps) {
  return (
    <div className={`${styles.container} ${classNames}`} style={{ ...style }}>
      <PaddedContainer classNames={styles.paddedContainer}>
        <div className={styles.notificationDetailsContainer}>
          <p className={styles.header}>{notificationHeader}</p>
          <p className={styles.description}>{notificationDescription}</p>
        </div>
      </PaddedContainer>
    </div>
  );
}
