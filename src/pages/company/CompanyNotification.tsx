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

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get("/api/notifications");
        if (response.data) {
          setNotifications(response.data);
        } else {
          setNotifications([]);
        }
        await axiosInstance.post("/api/notifications/mark-all-read");
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

  const totalPages = Math.ceil(sortedNotifications.length / itemsPerPage);
  const paginatedNotifs = sortedNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  console.log(paginatedNotifs);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePageSelect = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      {loading && <Spinner message={loading} />}
      <div className={styles.notificationContainer}>
        <h2 className={styles.title}>Notifications</h2>
        <StyledBox paddedContainerClass={styles.styledBox}>
          {paginatedNotifs.length > 0 ? (
            paginatedNotifs.map((notification, index) => (
              <NotificationItem
                key={index}
                notificationHeader={notification.header}
                notificationDescription={notification.description}
                notificationDate={notification.created_at}
              />
            ))
          ) : (
            <div className={styles.noNotifications}>
              No notifications available.
            </div>
          )}
        </StyledBox>

        {sortedNotifications.length > itemsPerPage && (
          <div className={styles.pagination}>
            <button
              className={`${styles.paginationButton} ${currentPage === 1 ? styles.disabled : ""}`}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              &#60; Previous
            </button>
            <button
              className={`${styles.paginationButton} ${currentPage === 1 ? styles.disabled : ""}`}
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              First
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1)
              .slice(
                Math.max(currentPage - 2, 0),
                Math.min(currentPage + 1, totalPages)
              )
              .map((page) => (
                <button
                  key={page}
                  className={`${styles.paginationButton} ${currentPage === page ? styles.active : ""}`}
                  onClick={() => handlePageSelect(page)}
                >
                  {page}
                </button>
              ))}

            <button
              className={`${styles.paginationButton} ${currentPage === totalPages ? styles.disabled : ""}`}
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </button>
            <button
              className={`${styles.paginationButton} ${currentPage === totalPages ? styles.disabled : ""}`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next &#62;
            </button>
          </div>
        )}
      </div>
    </PaddedContainer>
  );
}
