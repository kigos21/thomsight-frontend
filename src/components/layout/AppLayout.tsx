import styles from "./AppLayout.module.scss";

import { Link, Outlet } from "react-router-dom";
import NavbarApp from "../ui/NavbarApp";
import { useUser } from "../../contexts/UserContext";

export default function AppRoot() {
  const { user } = useUser();

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
        <Link to="#" key="resumeUser">
          Resume (dropdown to)
        </Link>,
      ];
      break;

    case "Rep":
      links = [
        <Link to="/" key="homeCompany">
          Home
        </Link>,
        <Link to="/announcements" key="announcementsCompany">
          Announcements
        </Link>,
        <Link to={`/company/${user.companyId}`} key="overviewCompany">
          {" "}
          {/* Assuming companyId is part of the user object */}
          Overview
        </Link>,
        <Link to="/manage/overview" key="manageinfoCompany">
          Manage Info
        </Link>,
      ];
      break;

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
      links = [
        <Link to="/" key="homeAdmin">
          Home
        </Link>,
      ];
  }

  // if (isStudent) {
  //   links = [
  //     <Link to="/" key="homeUser">
  //       Home
  //     </Link>,
  //     <Link to="/interview-guide" key="interviewTipsUser">
  //       Interview Tips
  //     </Link>,
  //     <Link to="#" key="resumeUser">
  //       Resume (dropdown to)
  //     </Link>,
  //   ];
  // } else if (isCompany) {
  //   links = [
  //     <Link to="/" key="homeCompany">
  //       Home
  //     </Link>,
  //     <Link to="/announcements" key="announcementsCompany">
  //       Announcements
  //     </Link>,
  //     <Link to="/company/theirCompanyId" key="overviewCompany">
  //       Overview
  //     </Link>,
  //     <Link to="/manage/overview" key="manageinfoCompany">
  //       Manage Info
  //     </Link>,
  //   ];
  // } else {
  //   links = [
  //     <Link to="/" key="homeAdmin">
  //       Home
  //     </Link>,
  //     <Link to="/tokens" key="tokensAdmin">
  //       Tokens
  //     </Link>,
  //     <Link to="/announcements" key="announcementsAdmin">
  //       Announcements
  //     </Link>,
  //     <Link to="/tokens/companies" key="companiesAdmin">
  //       Companies
  //     </Link>,
  //     <Link to="/reports" key="reportsAdmin">
  //       Reports
  //     </Link>,
  //   ];
  // }

  return (
    <div className={styles.container}>
      <NavbarApp links={links} />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
