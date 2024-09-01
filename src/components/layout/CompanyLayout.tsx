import { Outlet } from "react-router-dom";
import NavbarCompany from "../ui/auth/NavbarCompany";
import CompanyDetails from "../ui/auth/CompanyDetails";
import styles from "./CompanyLayout.module.scss";

export default function CompanyRoot() {
  let elements: React.ReactNode[];

  if (true) {
    elements = [
      <a href="/" key="overviewCompany">
        Overview
      </a>,
      <a href="/" key="reviewCompany">
        Review
      </a>,
      <a href="/" key="jobsCompany">
        Jobs
      </a>,
      <a href="/" key="discussionforumCompany">
        Discussion Forum
      </a>,
      <a href="/" key="interviewtipsCompany">
        Interview Tips
      </a>,
    ];
  } else if (false) {
    elements = [
      <a href="/" key="overviewmanageinfoCompany">
        Overview
      </a>,
      <a href="/" key="jobinfomanageinfoCompany">
        Job Info
      </a>,
    ];
  }
  return (
    <div className={styles.container}>
      <CompanyDetails />
      <NavbarCompany elements={elements} />
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  );
}
