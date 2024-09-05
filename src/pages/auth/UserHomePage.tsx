import PaddedContainer from "../../components/layout/PaddedContainer";
import StyledBox from "../../components/layout/StyledBox";
import styles from "./UserHomePage.module.scss";

import NotificationItem from "../../components/ui/NotificationItem";

export default function UserHomePage() {
  return (
    <PaddedContainer>
      <StyledBox classNames={styles.styledBox}>
        <h1 className={styles.sample}>This is the home page</h1>
      </StyledBox>

      {/* try lang */}
      <StyledBox paddedContainerClass={styles.trialStyledBox}>
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
    </PaddedContainer>
  );
}
