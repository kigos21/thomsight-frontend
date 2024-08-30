import { Outlet } from "react-router-dom";
import NavbarApp from "../ui/auth/NavbarApp";
import styles from "./AppLayout.module.scss";

export default function AppRoot() {
  let elements: React.ReactNode[];

  if (true) {
    elements = [
      <a href="/" key="homeUser">
        Home
      </a>,
      <a href="/" key="interviewtipsUser">
        Interview Tips
      </a>,
      <a href="/" key="resumeUser">
        Resume
      </a>,
    ];
  } else if (false) {
    elements = [
      <a href="/" key="homeCompany">
        Home
      </a>,
      <a href="/" key="announcementsCompany">
        Announcements
      </a>,
      <a href="/" key="overviewCompany">
        Overview
      </a>,
      <a href="/" key="manageinfoCompany">
        Manage Info
      </a>,
    ];
  } else {
    elements = [
      <a href="/" key="homeAdmin">
        Home
      </a>,
      <a href="/" key="tokensAdmin">
        Tokens
      </a>,
      <a href="/" key="announcementsAdmin">
        Announcements
      </a>,
      <a href="/" key="companiesAdmin">
        Companies
      </a>,
      <a href="/" key="reportsAdmin">
        Reports
      </a>,
    ];
  }

  return (
    <div className={styles.container}>
      <NavbarApp elements={elements} />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
