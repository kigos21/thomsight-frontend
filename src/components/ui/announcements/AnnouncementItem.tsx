// import { AnnouncementItemProps } from "../../../types/props";
import StyledBox from "../../layout/StyledBox";
import { IconTrash, IconEdit } from "@tabler/icons-react";
import { useState } from "react";
import { useUser } from "../../../contexts/UserContext";
import styles from "./AnnouncementItem.module.scss";
import DeletePopUp from "../company/DeletePopUp";
import { toast } from "react-toastify";
import axiosInstance from "../../../services/axiosInstance";
import Spinner from "../Spinner";
import DOMPurify from "dompurify";
import EditAnnouncementPopup from "./EditAnnouncementPopup";

export default function AnnouncementItem({
  classNames,
  style,
  announcementHeader,
  date,
  announcementDescription,
  id,
  onDelete,
  onEdit,
}: any) {
  const [isDeletePopupVisible, setDeletePopupVisible] = useState(false);
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [editedHeader, setEditedHeader] = useState<string>(announcementHeader);
  const [editedDescription, setEditedDescription] = useState<string>(
    announcementDescription
  );
  const [loading, setLoading] = useState<string>("");

  const handleSaveEdit = async (id: number) => {
    if (!editedHeader.trim()) {
      toast.error("Subject should not be blank");
      return;
    }
    if (!editedDescription.trim()) {
      toast.error("Details should not be blank");
      return;
    }
    if (editedHeader.length > 100) {
      toast.error("Subject should be limited to 100 characters");
    }
    if (editedDescription.length > 500) {
      toast.error("Details should be limited to 500 characters");
      return;
    }
    try {
      setLoading("Updating announcement...");
      await axiosInstance.put(`/api/announcements/${id}/update`, {
        subject: editedHeader,
        details: editedDescription,
      });
      setEditPopupOpen(false);
      onEdit(id, editedHeader, editedDescription);
      toast.success("Updated announcement successfully");
    } catch (error) {
      console.error("Failed to save the announcement:", error);
      toast.error("Failed to update announcement. Please try again.");
    } finally {
      setLoading("");
    }
  };

  const handleDeleteClick = () => {
    setDeletePopupVisible(true);
  };

  const handleDelete = async () => {
    try {
      await onDelete(id);
      setDeletePopupVisible(false);
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  const handleEditClick = () => {
    setEditPopupOpen(true);
  };

  const { user } = useUser();

  return (
    <div className={`${styles.container} ${classNames}`} style={{ ...style }}>
      {loading && <Spinner message={loading} />}
      <div className={styles.detailsContainer}>
        <div className={styles.detailsHeaderContainer}>
          {isEditPopupOpen ? (
            <input
              className={styles.editHeaderInput}
              type="text"
              value={editedHeader}
              onChange={(e) => setEditedHeader(e.target.value)}
            />
          ) : (
            <p className={styles.header}>{announcementHeader}</p>
          )}
          <p className={styles.date}>{date}</p>
        </div>

        {user?.role === "Admin" && (
          <div className={styles.iconContainer}>
            <button
              onClick={handleEditClick}
              className={styles.iconButton}
            >
              <IconEdit className={styles.iconEdit} />
            </button>
            <button onClick={handleDeleteClick} className={styles.iconButton}>
              <IconTrash className={styles.iconDelete} />
            </button>
          </div>
        )}
      </div>
      <StyledBox paddedContainerClass={styles.styledBox}>
        {isEditPopupOpen ? (
          <div className={styles.editDescriptionSection}>
            <textarea
              className={styles.descriptionTextarea}
              rows={5}
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <div className={styles.editButtons}>
              <button
                className={styles.cancelButton}
                onClick={() => {
                  setEditPopupOpen(false);
                  setEditedHeader(announcementHeader);
                  setEditedDescription(announcementDescription);
                }}
              >
                Cancel
              </button>
              <button
                className={styles.saveButton}
                onClick={() => handleSaveEdit(id)}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <p
            className={styles.description}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(announcementDescription),
            }}
          ></p>
        )}
      </StyledBox>

      <DeletePopUp
        isVisible={isDeletePopupVisible}
        onClose={() => setDeletePopupVisible(false)}
        onDelete={handleDelete}
        heading="Delete Announcement"
        details="Are you sure you want to delete this announcement?"
      />

      <EditAnnouncementPopup
        isOpen={isEditPopupOpen}
        onClose={() => setEditPopupOpen(false)}
        announcement={{ id, subject: editedHeader, details: editedDescription }}
        onUpdate={(updatedAnnouncement) => {
          setEditedHeader(updatedAnnouncement.subject);
          setEditedDescription(updatedAnnouncement.details);
        }}
      />
    </div>
  );
}
