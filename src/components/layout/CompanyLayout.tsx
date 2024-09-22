import { Link, Outlet } from "react-router-dom";
import NavbarCompany from "../ui/NavbarCompany";
import CompanyDetails from "../ui/company/CompanyDetails";
import styles from "./CompanyLayout.module.scss";
import PaddedContainer from "./PaddedContainer";

export default function CompanyRoot() {
  let elements: React.ReactNode[];

  if (true) {
    elements = [
      <Link to="/company" key="overviewCompany">
        Overview
      </Link>,
      <Link to="/company#reviews" key="reviewCompany">
        Review
      </Link>,
      <Link to="/company/jobs" key="jobsCompany">
        Jobs
      </Link>,
      <Link to="/company/forum" key="discussionforumCompany">
        Discussion&nbsp;Forum
      </Link>,
      <Link to="/company/interview-tips" key="interviewtipsCompany">
        Interview&nbsp;Tips
      </Link>,
    ];
  } else if (false) {
    elements = [
      <Link to="/manage/overview" key="overviewmanageinfoCompany">
        Overview
      </Link>,
      <Link to="/manage/jobs" key="jobinfomanageinfoCompany">
        Job&nbsp;Info
      </Link>,
    ];
  }
  return (
    <div className={styles.container}>
      <CompanyDetails />
      <NavbarCompany elements={elements} />
      <PaddedContainer>
        <Outlet />
      </PaddedContainer>
    </div>
  );
}
