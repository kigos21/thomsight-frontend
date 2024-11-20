import styles from "./ReportsLayout.module.scss";

import { Link, Outlet, useLocation } from "react-router-dom";
import PaddedContainer from "./PaddedContainer";
import {
  IconBubbleText,
  IconBulb,
  IconStars,
  IconMessages,
} from "@tabler/icons-react";

const ReportsLayout = () => {
  const location = useLocation();

  const links: {
    path: string;
    name?: string | JSX.Element;
    icon?: JSX.Element;
  }[] = [
    {
      path: "/reports/discussion",
      name: (
        <div className={styles.badgeHolder}>
          Discussion <span className={styles.notificationBadge}>1</span>
        </div>
      ),
      icon: (
        <div className={styles.mobileBadgeHolder}>
          <IconBubbleText stroke={2} className={styles.bottomNavIcon} />
          <span className={styles.mobileNotificationBadge}>1</span>
        </div>
      ),
    },
    {
      path: "/reports/comments",
      name: (
        <div className={styles.badgeHolder}>
          Comments <span className={styles.notificationBadge}>1</span>
        </div>
      ),
      icon: (
        <div className={styles.mobileBadgeHolder}>
          <IconMessages stroke={2} className={styles.bottomNavIcon} />
          <span className={styles.mobileNotificationBadge}>1</span>
        </div>
      ),
    },
    {
      path: "/reports/reviews",
      name: (
        <div className={styles.badgeHolder}>
          Reviews <span className={styles.notificationBadge}>1</span>
        </div>
      ),
      icon: (
        <div className={styles.mobileBadgeHolder}>
          <IconStars stroke={2} className={styles.bottomNavIcon} />
          <span className={styles.mobileNotificationBadge}>1</span>
        </div>
      ),
    },
    {
      path: "/reports/interview-tips",
      name: (
        <div className={styles.badgeHolder}>
          Interview&nbsp;Tips
          <span className={styles.notificationBadge}>1</span>
        </div>
      ),
      icon: (
        <div className={styles.mobileBadgeHolder}>
          <IconBulb stroke={2} className={styles.bottomNavIcon} />
          <span className={styles.mobileNotificationBadge}>1</span>
        </div>
      ),
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
        {/* MAIN CONTENT */}
        <Outlet />
      </PaddedContainer>
    </div>
  );
};

export default ReportsLayout;
