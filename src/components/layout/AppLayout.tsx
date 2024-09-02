import styles from "./AppLayout.module.scss";

import { Link, Outlet } from "react-router-dom";
import NavbarApp from "../ui/main/NavbarApp";

export default function AppRoot() {
  const isStudent = false;
  const isCompany = false;

  let links: JSX.Element[];

  if (isStudent) {
    links = [
      <Link to="/" key="homeUser">
        Home
      </Link>,
      <Link to="/interview-guide" key="interviewTipsUser">
        Interview Tips
      </Link>,
      <Link to="#" key="resumeUser">
        Resume (dropdown to)
      </Link>,
    ];
  } else if (isCompany) {
    links = [
      <Link to="/" key="homeCompany">
        Home
      </Link>,
      <Link to="/announcements" key="announcementsCompany">
        Announcements
      </Link>,
      <Link to="/company/theirCompanyId" key="overviewCompany">
        Overview
      </Link>,
      <Link to="/manage/overview" key="manageinfoCompany">
        Manage Info
      </Link>,
    ];
  } else {
    links = [
      <Link to="/" key="homeAdmin">
        Home
      </Link>,
      <Link to="/tokens" key="tokensAdmin">
        Tokens
      </Link>,
      <Link to="/announcements" key="announcementsAdmin">
        Announcements
      </Link>,
      <Link to="/tokens/companies" key="companiesAdmin">
        Companies
      </Link>,
      <Link to="/reports" key="reportsAdmin">
        Reports
      </Link>,
    ];
  }

  return (
    <div className={styles.container}>
      <NavbarApp links={links} />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
