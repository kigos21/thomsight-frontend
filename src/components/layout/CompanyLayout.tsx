import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
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
  const { loading, error, getCompanyBySlug } = useCompanies();
  const { user } = useUser();
  const company = getCompanyBySlug(slug || "");
  const location = useLocation();

  if (loading) {
    return <Spinner message="Please wait while we render relevant data!" />;
  }

  if (!slug || slug.trim() === "" || error) {
    return <ErrorPage />;
  }

  const basePath = slug ? `/company/${slug}` : "/company";

  const isManagePath = location.pathname.includes("/manage");
  let elements: React.ReactNode[];
  if (!isManagePath) {
    elements = [
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
        Discussion&nbsp;Forum
      </Link>,
      <Link to={`${basePath}/interview-tips`} key="interviewtipsCompany">
        Interview&nbsp;Tips
      </Link>,
    ];
  } else {
    // Check if accessing user is authorized
    if (company?.posted_by !== user?.id) {
      return <Navigate to="/companies" replace />;
    }

    elements = [
      <Link to={`${basePath}/manage/info`} key="overviewmanageinfoCompany">
        Manage&nbsp;Overview
      </Link>,
      <Link to={`${basePath}/manage/jobs`} key="jobinfomanageinfoCompany">
        Manage&nbsp;Jobs
      </Link>,
    ];
  }

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
