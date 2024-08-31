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
      <Link to="/" key="interviewtipsUser">
        Interview Tips
      </Link>,
      <Link to="/" key="resumeUser">
        Resume
      </Link>,
    ];
  } else if (isCompany) {
    links = [
      <Link to="/" key="homeCompany">
        Home
      </Link>,
      <Link to="/" key="announcementsCompany">
        Announcements
      </Link>,
      <Link to="/" key="overviewCompany">
        Overview
      </Link>,
      <Link to="/" key="manageinfoCompany">
        Manage Info
      </Link>,
    ];
  } else {
    links = [
      <Link to="/" key="homeAdmin">
        Home
      </Link>,
      <Link to="/" key="tokensAdmin">
        Tokens
      </Link>,
      <Link to="/" key="announcementsAdmin">
        Announcements
      </Link>,
      <Link to="/" key="companiesAdmin">
        Companies
      </Link>,
      <Link to="/" key="reportsAdmin">
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
