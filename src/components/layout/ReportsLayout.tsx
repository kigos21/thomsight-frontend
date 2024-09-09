import styles from "./ReportsLayout.module.scss";

import { Link, Outlet, useLocation } from "react-router-dom";
import PaddedContainer from "./PaddedContainer";
import { IconBubbleText, IconBulb, IconStars } from "@tabler/icons-react";

const ReportsLayout = () => {
  const location = useLocation();

  const links: {
    path: string;
    name?: string;
    icon?: JSX.Element;
  }[] = [
    {
      path: "/reports/discussion",
      name: "Discussion",
      icon: <IconBubbleText stroke={2} className={styles.bottomNavIcon} />,
    },
    {
      path: "/reports/reviews",
      name: "Reviews",
      icon: <IconStars stroke={2} className={styles.bottomNavIcon} />,
    },
    {
      path: "/reports/interview-tips",
      name: "Interview\u00A0Tips",
      icon: <IconBulb stroke={2} className={styles.bottomNavIcon} />,
    },
  ];

  return (
    <div className={styles.rootLayout}>
      <div className={styles.sideNav}>
        <PaddedContainer>
          <ul className={styles.navList}>
            {links.map((link) => (
              <li key={link.name}>
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
          {links.map((link) => (
            <li key={link.name}>
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
