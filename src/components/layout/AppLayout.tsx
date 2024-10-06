import styles from "./AppLayout.module.scss";

import { NavLink, Outlet } from "react-router-dom";
import NavbarApp from "../ui/NavbarApp";
import { useUser } from "../../contexts/UserContext";
import { useCompanies } from "../../contexts/CompaniesContext";

export default function AppRoot() {
  const { user } = useUser();
  const { companies } = useCompanies();

  let links: JSX.Element[];

  switch (user?.role) {
    case "Student":
      links = [
        <NavLink to="/companies" key="homeUser">
          Companies
        </NavLink>,
        <NavLink to="/interview-guide" key="interviewTipsUser">
          Interview Tips
        </NavLink>,
        <NavLink to="#" key="resumeUser">
          Resume (dropdown to)
        </NavLink>,
      ];
      break;

    case "Rep": {
      const userCompany = companies?.find(
        (company) => company.posted_by === user.id
      );
      const companySlug = userCompany ? userCompany.slug : null;

      links = [
        <NavLink to="/companies" key="homeCompany">
          Companies
        </NavLink>,
        <NavLink to="/announcements" key="announcementsCompany">
          Announcements
        </NavLink>,
        <NavLink to={`/company/${companySlug}`} key="overviewCompany">
          {" "}
          {/* Assuming companyId is part of the user object */}
          Overview
        </NavLink>,
        <NavLink
          to={`/company/${companySlug}/manage/info`}
          key="manageinfoCompany"
        >
          Manage Info
        </NavLink>,
      ];
      break;
    }

    case "Admin":
      links = [
        <NavLink to="/companies" key="homeAdmin">
          Companies
        </NavLink>,
        <NavLink to="/tokens" key="tokensAdmin">
          Tokens
        </NavLink>,
        <NavLink to="/announcements" key="announcementsAdmin">
          Announcements
        </NavLink>,
        <NavLink to="/tokens/companies" key="companiesAdmin">
          Companies
        </NavLink>,
        <NavLink to="/reports" key="reportsAdmin">
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
