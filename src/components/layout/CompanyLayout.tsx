import { Outlet } from "react-router-dom";
import NavbarCompany from "../ui/auth/NavbarCompany";
import styles from "./AppLayout.module.scss";

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
      <NavbarCompany elements={elements} />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
