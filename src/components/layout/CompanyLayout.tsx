import { Link, Outlet, useLocation } from "react-router-dom";
import NavbarCompany from "../ui/NavbarCompany";
import CompanyDetails from "../ui/company/CompanyDetails";
import styles from "./CompanyLayout.module.scss";
import PaddedContainer from "./PaddedContainer";
import { useParams } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import ErrorPage from "../../pages/ErrorPage";
import { useCompanies } from "../../contexts/CompaniesContext";
import Spinner from "../ui/Spinner";

export default function CompanyRoot() {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useUser();
  const { loading, error, getCompanyBySlug } = useCompanies();

  if (loading) {
    return <Spinner message="Please wait while we render relevant data!" />;
  }

  if (!slug || slug.trim() === "" || error) {
    return <ErrorPage />;
  }

  const company = getCompanyBySlug(slug || "");

  const basePath = slug ? `/company/${slug}` : "/company";

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

  if (user?.role === "Rep" && company?.posted_by === user?.id) {
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
