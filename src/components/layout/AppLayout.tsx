import styles from "./AppLayout.module.scss";

import { Link, Outlet } from "react-router-dom";
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
      links = [
        <Link to="/" key="homeUser">
          Home
        </Link>,
        <Link to="/interview-guide" key="interviewTipsUser">
          Interview Tips
        </Link>,
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
        <Link to="/" key="homeCompany">
          Home
        </Link>,
        <Link to="/announcements" key="announcementsCompany">
          Announcements
        </Link>,
        <Link to={`/company/${companySlug}`} key="overviewCompany">
          {" "}
          {/* Assuming companyId is part of the user object */}
          Overview
        </Link>,
        <Link
          to={`/company/${companySlug}/manage/info`}
          key="manageinfoCompany"
        >
          Manage Info
        </Link>,
      ];
      break;
    }

    case "Admin":
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
