import PaddedContainer from "../../components/layout/PaddedContainer";
import StyledBox from "../../components/layout/StyledBox";
import styles from "./UserHomePage.module.scss";

import NotificationItem from "../../components/ui/NotificationItem";
import AnnouncementItem from "../../components/ui/AnnouncementItem";
import CompanyOverviewDescriptionItem from "../../components/ui/CompanyOverviewDescriptionItem";
import CompanyLocationItem from "../../components/ui/CompanyLocationItem";
import CompanyJobInformationFormItem from "../../components/ui/CompanyJobInformationFormItem";
import AdminCreatennouncementItem from "../../components/ui/AdminCreateAnnouncementItem";

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

      <AnnouncementItem
        announcementHeader="Announcement sample"
        date="1/17/2024"
        announcementDescription="this is the announcement for today"
      ></AnnouncementItem>

      <CompanyOverviewDescriptionItem companyDescription="This is the description"></CompanyOverviewDescriptionItem>

      <CompanyLocationItem location="Makati, Philippines"></CompanyLocationItem>

      <CompanyJobInformationFormItem
        jobTitle=""
        tags=""
        jobDescription=""
      ></CompanyJobInformationFormItem>

      <AdminCreatennouncementItem
        subject=""
        detail=""
      ></AdminCreatennouncementItem>
    </PaddedContainer>
  );
}
