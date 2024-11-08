import styles from "./AppLayout.module.scss";

import { NavLink, Outlet } from "react-router-dom";
import NavbarApp from "../ui/NavbarApp";
import { useUser } from "../../contexts/UserContext";
import { useCompanies } from "../../contexts/CompaniesContext";
import NavDropdown from "../ui/NavDropdown";

export default function AppRoot() {
  const { user } = useUser();
  const { companies } = useCompanies();

  let links: JSX.Element[];

  switch (user?.role) {
    case "Student":
    case "Alumni":
      links = [
        <NavLink
          to="/companies"
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
          to={`/company/${companySlug}`}
          key="overviewCompany"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          {" "}
          {/* Assuming companyId is part of the user object */}
          Overview
        </NavLink>,
        <NavLink
          to={`/company/${companySlug}/manage/info`}
          key="manageinfoCompany"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Manage Info
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
          to="/tokens/companies"
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
