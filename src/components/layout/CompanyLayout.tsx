import { Link, Outlet, useLocation } from "react-router-dom";
import NavbarCompany from "../ui/NavbarCompany";
import CompanyDetails from "../ui/company/CompanyDetails";
import styles from "./CompanyLayout.module.scss";
import PaddedContainer from "./PaddedContainer";
import { useParams } from "react-router-dom";

export default function CompanyRoot() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();

  const basePath = slug ? `/company/${slug}` : "/company";
  const isManagePath = location.pathname.includes("manage");

  let elements: React.ReactNode[];
  if (isManagePath) {
    elements = [
      <Link to={`manage/info`} key="overviewmanageinfoCompany">
        Overview
      </Link>,
      <Link to={`manage/jobs`} key="jobinfomanageinfoCompany">
        Job Info
      </Link>,
    ];
  } else {
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
        Discussion Forum
      </Link>,
      <Link to={`${basePath}/interview-tips`} key="interviewtipsCompany">
        Interview Tips
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
