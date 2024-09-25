import { Link, Outlet, useLocation } from "react-router-dom";
import NavbarCompany from "../ui/NavbarCompany";
import CompanyDetails from "../ui/company/CompanyDetails";
import styles from "./CompanyLayout.module.scss";
import PaddedContainer from "./PaddedContainer";
import { useParams } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import ErrorPage from "../../pages/ErrorPage";

export default function CompanyRoot() {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useUser();

  if (!slug || slug.trim() === "") {
    return <ErrorPage />;
  }
  // const location = useLocation();

  const basePath = slug ? `/company/${slug}` : "/company";
  // const isManagePath = location.pathname.includes("manage");

  const elements: React.ReactNode[] = [
    <Link to={`${basePath}`} key="overviewCompany">
      Overview
    </Link>,
    <Link to={`${basePath}#reviews`} key="reviewCompany">
      Review
    </Link>,
    <Link to={`${basePath}/jobs`} key="jobsCompany">
      Jobs
    </Link>,
    <Link to={`${basePath}/forum`} key="discussionforumCompany">
      Discussion Forum
    </Link>,
    <Link to={`${basePath}/interview-tips`} key="interviewtipsCompany">
      Interview Tips
    </Link>,
  ];

  if (user?.role === "Rep") {
    elements.push(
      <Link to={`${basePath}/manage/info`} key="overviewmanageinfoCompany">
        Manage Overview
      </Link>,
      <Link to={`${basePath}/manage/jobs`} key="jobinfomanageinfoCompany">
        Manage Jobs
      </Link>
    );
  }
  // let elements: React.ReactNode[];

  // if (true) {
  //   elements = [
  //     <Link to="/company" key="overviewCompany">
  //       Overview
  //     </Link>,
  //     <Link to="/company#reviews" key="reviewCompany">
  //       Review
  //     </Link>,
  //     <Link to="/company/jobs" key="jobsCompany">
  //       Jobs
  //     </Link>,
  //     <Link to="/company/forum" key="discussionforumCompany">
  //       Discussion&nbsp;Forum
  //     </Link>,
  //     <Link to="/company/interview-tips" key="interviewtipsCompany">
  //       Interview&nbsp;Tips
  //     </Link>,
  //   ];
  // } else if (false) {
  //   elements = [
  //     <Link to="/manage/overview" key="overviewmanageinfoCompany">
  //       Overview
  //     </Link>,
  //     <Link to="/manage/jobs" key="jobinfomanageinfoCompany">
  //       Job&nbsp;Info
  //     </Link>,
  //   ];
  // }
  return (
    <div className={styles.container}>
      <CompanyDetails />
      <NavbarCompany elements={elements} />
      <PaddedContainer>
        <Outlet />
      </PaddedContainer>
    </div>
  );
}
