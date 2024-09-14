import { Link, Outlet } from "react-router-dom";
import NavbarCompany from "../ui/auth/NavbarCompany";
import CompanyDetails from "../ui/auth/CompanyDetails";
import styles from "./CompanyLayout.module.scss";
import PaddedContainer from "./PaddedContainer";
import { useParams } from "react-router-dom";

export default function CompanyRoot() {
  const { slug } = useParams<{ slug: string }>();

  const basePath = slug ? `/company/${slug}` : "/company";

  let elements: React.ReactNode[];

  if (true) {
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
  } else {
    elements = [
      <Link to={`/manage/overview`} key="overviewmanageinfoCompany">
        Overview
      </Link>,
      <Link to={`/manage/jobs`} key="jobinfomanageinfoCompany">
        Job Info
      </Link>,
    ];
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
