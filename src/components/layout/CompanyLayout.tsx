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
import {
  IconHome,
  IconMessageCircle2,
  IconBriefcase,
  IconStars,
  IconBulb,
} from "@tabler/icons-react";

// Define the type for navigation links
interface NavLink {
  path: string;
  icon: JSX.Element;
}

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
  const isManagePath = location.pathname.includes("/manage/");

  // Define bottomNavLinks based on path type
  const bottomNavLinks: NavLink[] = !isManagePath
    ? [
        {
          path: `${basePath}`,
          icon: <IconHome stroke={2} className={styles.bottomNavIcon} />,
        },
        {
          path: `${basePath}#reviews`,
          icon: <IconStars stroke={2} className={styles.bottomNavIcon} />,
        },
        {
          path: `${basePath}/jobs`,
          icon: <IconBriefcase stroke={2} className={styles.bottomNavIcon} />,
        },
        {
          path: `${basePath}/forum`,
          icon: (
            <IconMessageCircle2 stroke={2} className={styles.bottomNavIcon} />
          ),
        },
        {
          path: `${basePath}/interview-tips`,
          icon: <IconBulb stroke={2} className={styles.bottomNavIcon} />,
        },
      ]
    : [
        {
          path: `${basePath}/manage/info`,
          icon: <IconHome stroke={2} className={styles.bottomNavIcon} />,
        },
        {
          path: `${basePath}/manage/jobs`,
          icon: <IconBriefcase stroke={2} className={styles.bottomNavIcon} />,
        },
      ];

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

      <div className={styles.bottomNav}>
        <ul className={styles.bottomNavList}>
          {bottomNavLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`${location.pathname === link.path ? styles.bottomNavIconActive : ""}`}
              >
                {link.icon}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
