import PaddedContainer from "../../components/layout/PaddedContainer";
import AnnouncementItem from "../../components/ui/announcements/AnnouncementItem";
import Button from "../../components/ui/Button";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { deleteAnnouncement, getAnnouncements } from "../../api/adminCRUD";
import { Announcement } from "../../types/types";
import styles from "./AdminViewAnnouncements.module.scss";
import Spinner from "../../components/ui/Spinner";
import { useUser } from "../../contexts/UserContext";
import { toast } from "react-toastify";
import CreateAnnouncementPopup from "../../components/ui/announcements/CreateAnnouncementPopUp";

export default function AdminViewAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string>("");
  const { user } = useUser();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await getAnnouncements();
        setAnnouncements(data);
      } catch (err) {
        toast.error("Failed to load announcements.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const addAnnouncement = (newAnnouncement: Announcement) => {
    setAnnouncements((prev) => [newAnnouncement, ...prev]);
  };

  const handleDelete = async (id: number) => {
    setDeleteLoading("Deleting announcement...");
    try {
      await deleteAnnouncement(id);
      setAnnouncements((prevAnnouncements) =>
        prevAnnouncements.filter((announcement) => announcement.id !== id)
      );
      toast.success("Deleted announcement successfully");
      setCurrentPage(1);
    } catch (error) {
      toast.error("Failed to delete announcement." + error);
    } finally {
      setDeleteLoading("");
    }
  };

  const handleEdit = (
    id: number,
    updatedHeader: string,
    updatedDescription: string
  ) => {
    setAnnouncements((prevAnnouncements) =>
      prevAnnouncements.map((announcement) =>
        announcement.id === id
          ? {
              ...announcement,
              title: updatedHeader,
              content: updatedDescription,
            }
          : announcement
      )
    );
  };

  const totalPages = Math.ceil(announcements.length / itemsPerPage);
  const paginatedAnnouncements = announcements.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Announcements</h2>
          {user?.role === "Admin" && (
            <Button
              classNames={styles.announcementButton}
              color="secondary"
              roundness="sm-rounded"
              onClick={() => setIsPopupOpen(true)}
            >
              <IconPlus size={25} stroke={1.5} className={styles.iconPlus} />
              Create Announcement
            </Button>
          )}
        </div>
        {deleteLoading && <Spinner message={deleteLoading} />}

        {loading ? (
          <Spinner message="Fetching announcements..." />
        ) : paginatedAnnouncements.length > 0 ? (
          paginatedAnnouncements.map((announcement) => (
            <AnnouncementItem
              key={announcement.id}
              id={announcement.id}
              announcementHeader={announcement.title}
              date={new Date(
                announcement.updated_at || ""
              ).toLocaleDateString()}
              announcementDescription={announcement.content}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <p>No announcements available.</p>
        )}

        {announcements.length > itemsPerPage && (
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

      <CreateAnnouncementPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onAdd={addAnnouncement}
      />
    </PaddedContainer>
  );
}
