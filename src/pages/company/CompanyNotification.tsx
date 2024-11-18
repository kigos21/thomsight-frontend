import PaddedContainer from "../../components/layout/PaddedContainer";
import StyledBox from "../../components/layout/StyledBox";
import NotificationItem from "../../components/ui/company/NotificationItem";

import styles from "./CompanyNotification.module.scss";

export default function CompanyNotification() {
  return (
    <PaddedContainer>
      <div className={styles.notificationContainer}>
        <h2 className={styles.title}>Notifications</h2>
        <StyledBox paddedContainerClass={styles.styledBox}>
          <NotificationItem
            notificationHeader="Mention 1"
            notificationDescription="sample mention to rep"
          ></NotificationItem>
          <NotificationItem
            notificationHeader="Mention 2"
            notificationDescription="sample mention to rep"
          ></NotificationItem>
          <NotificationItem
            notificationHeader="Mention 3"
            notificationDescription="sample mention to rep"
          ></NotificationItem>
        </StyledBox>
      </div>
    </PaddedContainer>
  );
}
