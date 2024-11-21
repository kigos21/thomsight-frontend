import styles from "./ReportsLayout.module.scss";

import { Link, Outlet, useLocation } from "react-router-dom";
import PaddedContainer from "./PaddedContainer";
import {
  IconBubbleText,
  IconBulb,
  IconStars,
  IconMessages,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { toast } from "react-toastify";

const ReportsLayout = () => {
  const location = useLocation();
  const [unreadDiscussionNotifications, setUnreadDiscussionNotifications] =
    useState<number>(0);
  const [unreadFeedbackNotifications, setUnreadFeedbackNotifications] =
    useState<number>(0);
  const [unreadTipNotifications, setUnreadTipNotifications] =
    useState<number>(0);
  const [unreadCommentNotifications, setUnreadCommentNotifications] =
    useState<number>(0);

  const fetchUnreadNotifications = async () => {
    try {
      const discussion = await axiosInstance.get(
        "/api/reports/discussion/notification-number"
      );
      setUnreadDiscussionNotifications(discussion.data);
      const feedback = await axiosInstance.get(
        "/api/reports/feedback/notification-number"
      );
      setUnreadFeedbackNotifications(feedback.data);
      const tip = await axiosInstance.get(
        "/api/reports/tip/notification-number"
      );
      setUnreadTipNotifications(tip.data);
      const comment = await axiosInstance.get(
        "/api/reports/comment/notification-number"
      );
      setUnreadCommentNotifications(comment.data);
    } catch (error) {
      toast.error("Failed to fetch notifications.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUnreadNotifications();
  }, []);

  const links: {
    path: string;
    name?: string | JSX.Element;
    icon?: JSX.Element;
  }[] = [
    {
      path: "/reports/discussion",
      name: (
        <div
          className={styles.badgeHolder}
          onClick={() => setUnreadDiscussionNotifications(0)}
        >
          Discussion{" "}
          {unreadDiscussionNotifications > 0 && (
            <span className={styles.notificationBadge}>
              {unreadDiscussionNotifications >= 100
                ? "99+"
                : unreadDiscussionNotifications}
            </span>
          )}
        </div>
      ),
      icon: (
        <div
          className={styles.mobileBadgeHolder}
          onClick={() => setUnreadDiscussionNotifications(0)}
        >
          <IconBubbleText stroke={2} className={styles.bottomNavIcon} />
          {unreadDiscussionNotifications > 0 && (
            <span className={styles.mobileNotificationBadge}>
              {unreadDiscussionNotifications >= 100
                ? "99+"
                : unreadDiscussionNotifications}
            </span>
          )}
        </div>
      ),
    },
    {
      path: "/reports/comments",
      name: (
        <div
          className={styles.badgeHolder}
          onClick={() => setUnreadCommentNotifications(0)}
        >
          Comments{" "}
          {unreadCommentNotifications > 0 && (
            <span className={styles.notificationBadge}>
              {unreadCommentNotifications >= 100
                ? "99+"
                : unreadCommentNotifications}
            </span>
          )}
        </div>
      ),
      icon: (
        <div
          className={styles.mobileBadgeHolder}
          onClick={() => setUnreadCommentNotifications(0)}
        >
          <IconMessages stroke={2} className={styles.bottomNavIcon} />
          {unreadCommentNotifications > 0 && (
            <span className={styles.mobileNotificationBadge}>
              {unreadCommentNotifications >= 100
                ? "99+"
                : unreadCommentNotifications}
            </span>
          )}
        </div>
      ),
    },
    {
      path: "/reports/reviews",
      name: (
        <div
          className={styles.badgeHolder}
          onClick={() => setUnreadFeedbackNotifications(0)}
        >
          Reviews{" "}
          {unreadFeedbackNotifications > 0 && (
            <span className={styles.notificationBadge}>
              {unreadFeedbackNotifications >= 100
                ? "99+"
                : unreadFeedbackNotifications}
            </span>
          )}
        </div>
      ),
      icon: (
        <div
          className={styles.mobileBadgeHolder}
          onClick={() => setUnreadFeedbackNotifications(0)}
        >
          <IconStars stroke={2} className={styles.bottomNavIcon} />
          {unreadFeedbackNotifications > 0 && (
            <span className={styles.mobileNotificationBadge}>
              {unreadFeedbackNotifications >= 100
                ? "99+"
                : unreadFeedbackNotifications}
            </span>
          )}
        </div>
      ),
    },
    {
      path: "/reports/interview-tips",
      name: (
        <div
          className={styles.badgeHolder}
          onClick={() => setUnreadTipNotifications(0)}
        >
          Interview&nbsp;Tips
          {unreadTipNotifications > 0 && (
            <span className={styles.notificationBadge}>
              {unreadTipNotifications >= 100 ? "99+" : unreadTipNotifications}
            </span>
          )}
        </div>
      ),
      icon: (
        <div
          className={styles.mobileBadgeHolder}
          onClick={() => setUnreadTipNotifications(0)}
        >
          <IconBulb stroke={2} className={styles.bottomNavIcon} />
          {unreadTipNotifications > 0 && (
            <span className={styles.mobileNotificationBadge}>
              {unreadTipNotifications >= 100 ? "99+" : unreadTipNotifications}
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
        {/* MAIN CONTENT */}
        <Outlet />
      </PaddedContainer>
    </div>
  );
};

export default ReportsLayout;
