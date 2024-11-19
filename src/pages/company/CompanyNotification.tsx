import { useEffect, useState } from "react";
import PaddedContainer from "../../components/layout/PaddedContainer";
import StyledBox from "../../components/layout/StyledBox";
import NotificationItem from "../../components/ui/company/NotificationItem";

import styles from "./CompanyNotification.module.scss";
import Spinner from "../../components/ui/Spinner";
import axiosInstance from "../../services/axiosInstance";
import { toast } from "react-toastify";

interface Notification {
  id: number;
  header: string;
  description: string;
  created_at: Date;
}

export default function CompanyNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState("Fetching notifications");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get("/api/notifications");
        if (response.data) {
          setNotifications(response.data);
        } else {
          setNotifications([]);
        }
      } catch (err) {
        toast.error("Failed to load notifications. Please try again later.");
        console.error(err);
      } finally {
        setLoading("");
      }
    };

    fetchNotifications();
  }, []);

  const sortNotificationsByDate = (notifs: Notification[]) => {
    return notifs.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateB - dateA;
    });
  };

  const sortedNotifications = sortNotificationsByDate(notifications);

  return (
    <PaddedContainer>
      {loading && <Spinner message={loading} />}
      <div className={styles.notificationContainer}>
        <h2 className={styles.title}>Notifications</h2>
        <StyledBox paddedContainerClass={styles.styledBox}>
          {sortedNotifications.length > 0 ? (
            notifications.map((notification, index) => (
              <NotificationItem
                key={index}
                notificationHeader={notification.header}
                notificationDescription={notification.description}
              />
            ))
          ) : (
            <div className={styles.noNotifications}>
              No notifications available.
            </div>
          )}
        </StyledBox>
      </div>
    </PaddedContainer>
  );
}
