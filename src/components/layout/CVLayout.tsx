import styles from "./CVLayout.module.scss";

import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import PaddedContainer from "./PaddedContainer";
import Button from "../ui/Button";
import {
  IconFileCheck,
  IconFilePencil,
  IconHelp,
  IconHourglassHigh,
  IconList,
  IconOutbound,
} from "@tabler/icons-react";
import { useUser } from "../../contexts/UserContext";

const CVLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();

  const helpText =
    "Listing: posted CVs by the community \n" +
    "Pending: CVs sent to you for a review request \n" +
    "To Review: CVs to review \n" +
    "Reviewed: CVs reviewed \n" +
    "My Requests: Your CV review requests sent to others";

  const links: {
    path: string;
    name?: string | JSX.Element;
    icon?: JSX.Element;
  }[] = [
    {
      path: "/cv-review",
      name: "Listing",
      icon: <IconList stroke={2} className={styles.bottomNavIcon} />,
    },
    ...(user!.role === "Student"
      ? [
          {
            path: "/cv-review/pending",
            name: (
              <div className={styles.badgeHolder}>
                Pending <span className={styles.notificationBadge}>1</span>
              </div>
            ),
            icon: (
              <div className={styles.mobileBadgeHolder}>
                <IconHourglassHigh
                  stroke={2}
                  className={styles.bottomNavIcon}
                />
                <span className={styles.mobileNotificationBadge}>1</span>
              </div>
            ),
          },
        ]
      : []),

    {
      path: "/cv-review/to-review",
      name: (
        <div className={styles.badgeHolder}>
          To&nbsp;Review <span className={styles.notificationBadge}>1</span>
        </div>
      ),
      icon: (
        <div className={styles.mobileBadgeHolder}>
          <IconFilePencil stroke={2} className={styles.bottomNavIcon} />
          <span className={styles.mobileNotificationBadge}>1</span>
        </div>
      ),
    },
    {
      path: "/cv-review/reviewed",
      name: "Reviewed",
      icon: <IconFileCheck stroke={2} className={styles.bottomNavIcon} />,
    },
    {
      path: "/cv-review/my-requests",
      name: "My Requests",
      icon: <IconOutbound stroke={2} className={styles.bottomNavIcon} />,
    },
  ];

  return (
    <div className={styles.rootLayout}>
      <div className={styles.sideNav}>
        <PaddedContainer>
          <ul className={styles.navList}>
            {links.map((link, i) => (
              <li key={i}>
                <Link
                  to={link.path}
                  className={`${location.pathname === link.path && styles.activeLink}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </PaddedContainer>
      </div>

      <div className={styles.bottomNav}>
        <ul className={styles.bottomNavList}>
          {links.map((link, i) => (
            <li key={i}>
              <Link
                to={link.path}
                className={`${location.pathname === link.path && styles.bottomNavIconActive}`}
              >
                {link.icon && link.icon}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <PaddedContainer classNames={styles.main}>
        <header className={styles.header}>
          <h1>
            CV and Resume Peer Review Center&nbsp;
            <IconHelp className={styles.helpIcon} title={helpText} />
          </h1>
          {location.pathname === "/cv-review" && user!.role === "Student" && (
            <Button
              color={"primary"}
              roundness={"rounded"}
              onClick={() => navigate("/cv-review/post-cv")}
            >
              Post CV
            </Button>
          )}
        </header>
        {/* MAIN CONTENT */}
        <Outlet />
      </PaddedContainer>
    </div>
  );
};

export default CVLayout;
