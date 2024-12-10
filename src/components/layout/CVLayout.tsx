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
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { toast } from "react-toastify";

const CVLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  const [unreadPendingNotifications, setUnreadPendingNotifications] =
    useState<number>(0);
  const [unreadToReviewNotifications, setUnreadToReviewNotifications] =
    useState<number>(0);
  const [unreadReviewedNotifications, setUnreadReviewedNotifications] =
    useState<number>(0);

  const fetchUnreadNotifications = async () => {
    try {
      const pending = await axiosInstance.get(
        "/api/cvs/pending/notification-number"
      );
      setUnreadPendingNotifications(pending.data);
      const toReview = await axiosInstance.get(
        "/api/cvs/to-review/notification-number"
      );
      setUnreadToReviewNotifications(toReview.data);
      const reviewed = await axiosInstance.get(
        "/api/cvs/reviewed/notification-number"
      );
      setUnreadReviewedNotifications(reviewed.data);
    } catch (error) {
      toast.error("Failed to fetch notifications.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUnreadNotifications();
  }, [user]);

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
              <div
                className={styles.badgeHolder}
                onClick={() => setUnreadPendingNotifications(0)}
              >
                Pending{" "}
                {unreadPendingNotifications > 0 && (
                  <span className={styles.notificationBadge}>
                    {unreadPendingNotifications >= 100
                      ? "99+"
                      : unreadPendingNotifications}
                  </span>
                )}
              </div>
            ),
            icon: (
              <div
                className={styles.mobileBadgeHolder}
                onClick={() => setUnreadPendingNotifications(0)}
              >
                <IconHourglassHigh
                  stroke={2}
                  className={styles.bottomNavIcon}
                />
                {unreadPendingNotifications > 0 && (
                  <span className={styles.mobileNotificationBadge}>
                    {unreadPendingNotifications >= 100
                      ? "99+"
                      : unreadPendingNotifications}
                  </span>
                )}
              </div>
            ),
          },
        ]
      : []),

    {
      path: "/cv-review/to-review",
      name: (
        <div
          className={styles.badgeHolder}
          onClick={() => setUnreadToReviewNotifications(0)}
        >
          To&nbsp;Review{" "}
          {unreadToReviewNotifications > 0 && (
            <span className={styles.notificationBadge}>
              {unreadToReviewNotifications >= 100
                ? "99+"
                : unreadToReviewNotifications}
            </span>
          )}
        </div>
      ),
      icon: (
        <div
          className={styles.mobileBadgeHolder}
          onClick={() => setUnreadToReviewNotifications(0)}
        >
          <IconFilePencil stroke={2} className={styles.bottomNavIcon} />
          {unreadToReviewNotifications > 0 && (
            <span className={styles.mobileNotificationBadge}>
              {unreadToReviewNotifications >= 100
                ? "99+"
                : unreadToReviewNotifications}
            </span>
          )}
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
      name: (
        <div
          className={styles.badgeHolder}
          onClick={() => setUnreadReviewedNotifications(0)}
        >
          My&nbsp;Requests
          {unreadReviewedNotifications > 0 && (
            <span className={styles.notificationBadge}>
              {unreadReviewedNotifications >= 100
                ? "99+"
                : unreadReviewedNotifications}
            </span>
          )}
        </div>
      ),
      icon: (
        <div
          className={styles.mobileBadgeHolder}
          onClick={() => setUnreadToReviewNotifications(0)}
        >
          <IconOutbound stroke={2} className={styles.bottomNavIcon} />
          {unreadToReviewNotifications > 0 && (
            <span className={styles.mobileNotificationBadge}>
              {unreadToReviewNotifications >= 100
                ? "99+"
                : unreadToReviewNotifications}
            </span>
          )}
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
        <header className={styles.header}>
          <h1>
            CV and Resume Peer Review Center&nbsp;
            <IconHelp className={styles.helpIcon} title={helpText} />
          </h1>
          {location.pathname === "/cv-review" && user!.role === "Student" && (
            <Button
              color={"secondary"}
              roundness={"sm-rounded"}
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
