import styles from "./AppLayout.module.scss";

import { NavLink, Outlet } from "react-router-dom";
import NavbarApp from "../ui/NavbarApp";

export default function AppRoot() {
  const isStudent = false;
  const isCompany = false;

  let links: JSX.Element[];

  if (isStudent) {
    links = [
      <NavLink
        to="/"
        key="homeUser"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Home
      </NavLink>,
      <NavLink
        to="/interview-guide"
        key="interviewTipsUser"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Interview Tips
      </NavLink>,
      <NavLink
        to="#"
        key="resumeUser"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Resume (dropdown to)
      </NavLink>,
    ];
  } else if (isCompany) {
    links = [
      <NavLink
        to="/"
        key="homeCompany"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Home
      </NavLink>,
      <NavLink
        to="/announcements"
        key="announcementsCompany"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Announcements
      </NavLink>,
      <NavLink
        to="/company/theirCompanyId"
        key="overviewCompany"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Overview
      </NavLink>,
      <NavLink
        to="/manage/overview"
        key="manageinfoCompany"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Manage Info
      </NavLink>,
    ];
  } else {
    links = [
      <NavLink
        to="/"
        key="homeAdmin"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Home
      </NavLink>,
      <NavLink
        to="/tokens"
        key="tokensAdmin"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Tokens
      </NavLink>,
      <NavLink
        to="/announcements"
        key="announcementsAdmin"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Announcements
      </NavLink>,
      <NavLink
        to="/companies"
        key="companiesAdmin"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Companies
      </NavLink>,
      <NavLink
        to="/reports"
        key="reportsAdmin"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        Reports
      </NavLink>,
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
