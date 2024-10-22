import PaddedContainer from "../../components/layout/PaddedContainer";
import AnnouncementItem from "../../components/ui/announcements/AnnouncementItem";
import Button from "../../components/ui/Button";
import { IconPlus } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteAnnouncement, getAnnouncements } from "../../api/adminCRUD";
import { Announcement } from "../../types/types";

import styles from "./AdminViewAnnouncements.module.scss";
import Spinner from "../../components/ui/Spinner";
import SuccessMessage from "../../components/form/SuccessMessage";
import { useUser } from "../../contexts/UserContext";

export default function AdminViewAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [deleteLoading, setDeleteLoading] = useState<string>("");
  const [deleteSuccess, setDeleteSuccess] = useState<string>("");
  const { user } = useUser();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await getAnnouncements();
        setAnnouncements(data);
      } catch (err) {
        setError("Failed to load announcements." + err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleDelete = async (id: number) => {
    setDeleteLoading("Deleting announcement...");
    try {
      await deleteAnnouncement(id);
      setAnnouncements((prevAnnouncements) =>
        prevAnnouncements.filter((announcement) => announcement.id !== id)
      );
      setDeleteSuccess("Deleted announcement successfully");
    } catch (error) {
      setError("Failed to delete announcement." + error);
    } finally {
      setDeleteLoading("");
    }
  };

  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Announcements</h2>
          {user?.role === "Admin" && (
            <Link to={"/announcements/create"}>
              <Button
                classNames={styles.announcementButton}
                color="secondary"
                roundness="rounded"
              >
                <IconPlus size={25} stroke={1.5} className={styles.iconPlus} />
                Create Announcement
              </Button>
            </Link>
          )}
        </div>
        {deleteSuccess && <SuccessMessage message={deleteSuccess} />}
        {deleteLoading && <Spinner message={deleteLoading} />}

        {loading ? (
          <Spinner message="Fetching announcements..." />
        ) : error ? (
          <p>{error}</p>
        ) : announcements.length > 0 ? (
          announcements.map((announcement) => (
            <AnnouncementItem
              key={announcement.id}
              id={announcement.id}
              announcementHeader={announcement.title}
              date={new Date(announcement.updated_at).toLocaleDateString()}
              announcementDescription={announcement.content}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>No announcements available.</p>
        )}
      </div>
    </PaddedContainer>
  );
}
