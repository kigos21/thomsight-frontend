// import { AnnouncementItemProps } from "../../../types/props";
import StyledBox from "../../layout/StyledBox";
import { IconTrash, IconEdit } from "@tabler/icons-react";
import { useState } from "react";
import { useUser } from "../../../contexts/UserContext";
import styles from "./AnnouncementItem.module.scss";
import DeletePopUp from "../company/DeletePopUp";
import { toast } from "react-toastify";
import axiosInstance from "../../../services/axiosInstance";
import { useParams } from "react-router-dom";

interface Announcement {
  id: number;
  post: string;
}
export default function AnnouncementItem({
  classNames,
  style,
  announcementHeader,
  date,
  announcementDescription,
  id,
  onDelete,
}: any) {
  const [isDeletePopupVisible, setDeletePopupVisible] = useState(false);
  const [activeEditReplyId, setActiveEditReplyId] = useState<number | null>(
    null
  );
  const [editedReplyText, setEditedReplyText] = useState("");
  const [loading, setLoading] = useState<string>("");
  const { slug } = useParams<{ slug: string }>();
  const [postData, setPostData] = useState<Announcement[]>([]);

  const handleIconClick = () => {
    console.log("Icon clicked!");
  };

  const handleSaveEdit = async (replyId: number) => {
    if (editedReplyText.length > 500) {
      toast.error("Comments should be limited to 500 characters");
      return;
    }
    try {
      setLoading("Updating comment...");
      await axiosInstance.put(
        `/api/company/${slug}/comment/${replyId}/delete`,
        {
          comment: editedReplyText,
        }
      );
      setLoading("Loading discussions...");
      const response = await axiosInstance.get(
        `/api/company/${slug}/discussions`
      );
      const discussions = response.data;
      setPostData(discussions);
      setActiveEditReplyId(null);
      setEditedReplyText("");
    } catch (error) {
      console.error("Failed to save the reply:", error);
      toast.error("Failed to update reply. Please try again.");
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

  const { user } = useUser();

  return (
    <div className={`${styles.container} ${classNames}`} style={{ ...style }}>
      <div className={styles.detailsContainer}>
        <div className={styles.detailsHeaderContainer}>
          <p className={styles.header}>{announcementHeader}</p>
          <p className={styles.date}>{date}</p>
        </div>

        {activeEditReplyId === reply.id ? (
          <div className={styles.editDescriptionSection}>
            <textarea
              className={styles.descriptionTextarea}
              rows={5}
              value={editedReplyText}
              onChange={(e) => setEditedReplyText(e.target.value)}
            />
            <div className={styles.editButtons}>
              <button
                className={styles.cancelButton}
                onClick={() => setActiveEditReplyId(null)}
              >
                Cancel
              </button>
              <button
                className={styles.saveButton}
                onClick={() => handleSaveEdit(reply.id)}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div>{reply.comment}</div>
        )}
        {user?.role === "Admin" && (
          <div className={styles.iconContainer}>
            <button onClick={handleIconClick} className={styles.iconButton}>
              <IconEdit className={styles.iconEdit} />
            </button>
            <button onClick={handleDeleteClick} className={styles.iconButton}>
              <IconTrash className={styles.iconDelete} />
            </button>
          </div>
        )}
      </div>
      <StyledBox paddedContainerClass={styles.styledBox}>
        <p className={styles.description}>{announcementDescription}</p>
      </StyledBox>

      <DeletePopUp
        isVisible={isDeletePopupVisible}
        onClose={() => setDeletePopupVisible(false)}
        onDelete={handleDelete}
        heading="Delete Announcement"
        details="Are you sure you want to delete this announcement?"
      />
    </div>
  );
}
