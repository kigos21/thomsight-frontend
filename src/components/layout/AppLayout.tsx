import styles from "./AppLayout.module.scss";

import { NavLink, Outlet, useLocation } from "react-router-dom";
import NavbarApp from "../ui/NavbarApp";
import { useUser } from "../../contexts/UserContext";
import { useCompanies } from "../../contexts/CompaniesContext";
import NavDropdown from "../ui/NavDropdown";
import { useNav } from "../../contexts/NavContext";
import { IconBell } from "@tabler/icons-react";

export default function AppRoot() {
  const { user } = useUser();
  const { companies } = useCompanies();
  const { setDisplayNav } = useNav();
  const location = useLocation();

  let links: JSX.Element[];

  switch (user?.role) {
    case "Student":
    case "Alumni":
      links = [
        <NavLink
          to="/companies"
          key="homeUser"
          className={({ isActive }) => (isActive ? styles.active : "")}
          onClick={() => setDisplayNav(false)}
        >
          Home
        </NavLink>,
        <NavLink
          to="/interview-guide"
          key="interviewTipsUser"
          className={({ isActive }) => (isActive ? styles.active : "")}
          onClick={() => setDisplayNav(false)}
        >
          Interview Tips
        </NavLink>,
        <NavDropdown
          key="resumeUser"
          label={"Resume"}
          items={[
            { label: "Peer Review", link: "/cv-review" },
            {
              label: "Resume Tips",
              link: "/cv-guide",
            },
          ]}
        />,
        <NavLink
          to="/faqs"
          key="faqs"
          className={({ isActive }) => (isActive ? styles.active : "")}
          onClick={() => setDisplayNav(false)}
        >
          FAQs
        </NavLink>,
      ];
      break;

    case "Rep": {
      const userCompany = companies?.find(
        (company) => company.posted_by === user.id
      );
      const companySlug = userCompany ? userCompany.slug : null;

      links = [
        <NavLink
          to="/companies"
          key="homeCompany"
          className={({ isActive }) => (isActive ? styles.active : "")}
          onClick={() => setDisplayNav(false)}
        >
          Home
        </NavLink>,
        <NavLink
          to="/announcements"
          key="announcementsCompany"
          className={({ isActive }) => (isActive ? styles.active : "")}
          onClick={() => setDisplayNav(false)}
        >
          Announcements
        </NavLink>,
        <NavLink
          to={`/company/${companySlug}`}
          key="overviewCompany"
          className={({ isActive }) =>
            isActive && !location.pathname.includes("/manage")
              ? styles.active
              : ""
          }
          onClick={() => setDisplayNav(false)}
        >
          {" "}
          {/* Assuming companyId is part of the user object */}
          Overview
        </NavLink>,
        <NavLink
          to={`/company/${companySlug}/manage/info`}
          key="manageinfoCompany"
          className={({ isActive }) =>
            isActive || location.pathname.includes("/manage/jobs")
              ? styles.active
              : ""
          }
          onClick={() => setDisplayNav(false)}
        >
          Manage Info
        </NavLink>,
        <NavLink
          to="/faqs"
          key="faqs"
          className={({ isActive }) => (isActive ? styles.active : "")}
          onClick={() => setDisplayNav(false)}
        >
          FAQs
        </NavLink>,
        <NavLink
          to="/notifications"
          key="notifications"
          className={({ isActive }) => `
    ${isActive ? styles.active : ""} 
    ${styles.notificationContainer}
  `}
          onClick={() => setDisplayNav(false)}
        >
          <IconBell className={styles.iconBell} size={30} />
          {<span className={styles.notificationBadge}>1</span>}
        </NavLink>,
      ];
      break;
    }

    case "Admin":
      links = [
        <NavLink
          to="/companies"
          key="homeAdmin"
          className={({ isActive }) => (isActive ? styles.active : "")}
          onClick={() => setDisplayNav(false)}
        >
          Home
        </NavLink>,
        <NavLink
          to="/tokens"
          key="tokensAdmin"
          className={({ isActive }) => (isActive ? styles.active : "")}
          onClick={() => setDisplayNav(false)}
        >
          Tokens
        </NavLink>,
        <NavLink
          to="/announcements"
          key="announcementsAdmin"
          className={({ isActive }) => (isActive ? styles.active : "")}
          onClick={() => setDisplayNav(false)}
        >
          Announcements
        </NavLink>,
        <NavLink
          to="/company-accounts"
          key="companiesAdmin"
          className={({ isActive }) => (isActive ? styles.active : "")}
          onClick={() => setDisplayNav(false)}
        >
          Companies
        </NavLink>,
        <NavLink
          to="/reports"
          key="reportsAdmin"
          className={({ isActive }) => (isActive ? styles.active : "")}
          onClick={() => setDisplayNav(false)}
        >
          Reports
        </NavLink>,
        <NavLink
          to="/faqs"
          key="faqs"
          className={({ isActive }) => (isActive ? styles.active : "")}
          onClick={() => setDisplayNav(false)}
        >
          FAQs
        </NavLink>,
      ];
      break;

    default: // Default case for admin or if no role matches
      links = [];
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
