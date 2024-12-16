// import { NotificationItemProps } from "../../../types/props";
import PaddedContainer from "../../layout/PaddedContainer";

import styles from "./NotificationItem.module.scss";
import DOMPurify from "dompurify";

export default function NotificationItem({
  classNames,
  style,
  notificationHeader,
  notificationDescription,
  notificationDate,
}: any) {
  return (
    <div className={`${styles.container} ${classNames}`} style={{ ...style }}>
      <PaddedContainer classNames={styles.paddedContainer}>
        <div className={styles.notificationDetailsContainer}>
          <div className={styles.headerContainer}>
            <p className={styles.header}>{notificationHeader}</p>
          </div>
          <div className={styles.descriptionContainer}>
            <p
              className={styles.description}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(notificationDescription),
              }}
            ></p>
          </div>
          <div className={styles.timestampContainer}>
            <p className={styles.timestamp}>{notificationDate}</p>
          </div>
        </div>
      </PaddedContainer>
    </div>
  );
}
