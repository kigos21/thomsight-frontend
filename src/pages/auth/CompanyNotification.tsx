import PaddedContainer from "../../components/layout/PaddedContainer";
import StyledBox from "../../components/layout/StyledBox";
import NotificationItem from "../../components/ui/NotificationItem";

import styles from "./CompanyNotification.module.scss";

export default function CompanyNotification() {
  return (
    <PaddedContainer>
      <div className={styles.notificationContainer}>
        <h2 className={styles.title}>Notifications</h2>
        <StyledBox paddedContainerClass={styles.styledBox}>
          <NotificationItem
            notificationHeader="ANNOUNCEMENT"
            notificationDescription="This is an announcement"
          ></NotificationItem>
          <NotificationItem
            notificationHeader="ANNOUNCEMENT 2"
            notificationDescription="This is an announcement"
          ></NotificationItem>
          <NotificationItem
            notificationHeader="ANNOUNCEMENT 3"
            notificationDescription="This is an announcement"
          ></NotificationItem>
        </StyledBox>
      </div>
    </PaddedContainer>
  );
}
