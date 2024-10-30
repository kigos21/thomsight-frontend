import { DiscussionForumItemProps } from "../../../types/props";
import { IconFlagFilled, IconTrash, IconEdit } from "@tabler/icons-react";
import Button from "../Button";

import styles from "./DiscussionForumItem.module.scss";
import StyledBox from "../../layout/StyledBox";
import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { useParams } from "react-router-dom";
import DeletePopUp from "./DeletePopUp";
import { containsBadWords } from "../../../badWordsFilter";
import ValidationError from "../../form/ValidationError";

export default function DiscussionForumItem({
  classNames,
  style,
  internName,
  date,
  description,
  onDescriptionChange,
  id,
  setSuccess,
  setLoading,
  setError,
  onDiscussionDelete,
}: DiscussionForumItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tempDescription, setTempDescription] = useState<string>(description);
  const { slug } = useParams<{ slug: string }>();
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [descriptionError, setDescriptionError] = useState<string>("");

  const handleIconClick = () => {
    console.log("Icon clicked!");
  };

  const handleEditClick = () => {
    setError("");
    setSuccess("");
    setIsEditing((state) => !state);
  };

  const handleSaveClick = async () => {
    setDescriptionError("");
    if (containsBadWords(tempDescription)) {
      setDescriptionError("New description contains foul language");
      return;
    }
    try {
      setLoading("Updating discussion...");
      await axiosInstance.put(`/api/company/${slug}/discussion/${id}/update`, {
        description: tempDescription,
      });

      onDescriptionChange(tempDescription);
      setIsEditing(false);
      setSuccess("Updated discussion successfully");
    } catch (error) {
      console.error("Error updating the discussion:", error);
      setError("Could not update discussion. Please try again.");
    } finally {
      setLoading("");
    }
  };

  const handleCancelClick = () => {
    setTempDescription(description);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setSuccess("");
    setError("");
    setShowDeletePopup(true);
  };

  const handleDeleteDiscussion = async () => {
    try {
      setLoading("Deleting review...");
      await axiosInstance.delete(
        `/api/company/${slug}/discussion/${id}/delete`
      );
      if (onDiscussionDelete) {
        onDiscussionDelete(id);
      }
      setSuccess("Deleted discussion successfully");
    } catch (err) {
      console.error("Error deleting review:" + err);
      setError("Could not delete discussion. Please try again.");
    } finally {
      setLoading("");
      setShowDeletePopup(false);
    }
  };

  return (
    <div className={`${styles.container} ${classNames}`} style={{ ...style }}>
      <StyledBox paddedContainerClass={styles.styledBox}>
        <div className={styles.forumContainer}>
          <div className={styles.ForumSubjectContainer}>
            <p className={styles.internName}>{internName}</p>
            <p className={styles.date}>{date}</p>

            <div className={styles.replyButtonContainer}>
              <Button
                color="black"
                roundness="rounded"
                classNames={styles.replyButton}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-reply-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.921 11.9 1.353 8.62a.72.72 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z" />
                </svg>
                Reply
              </Button>
            </div>
          </div>

          {isEditing ? (
            <div className={styles.editDescriptionSection}>
              {descriptionError && (
                <ValidationError message={descriptionError} />
              )}
              <textarea
                className={styles.descriptionTextarea}
                value={tempDescription}
                onChange={(e) => setTempDescription(e.target.value)}
                rows={5}
              />
              <div className={styles.editButtons}>
                <button
                  onClick={handleCancelClick}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
                <button onClick={handleSaveClick} className={styles.saveButton}>
                  Save
                </button>
              </div>
            </div>
          ) : (
            <p className={styles.discussionForumDescription}>{description}</p>
          )}

          <div className={styles.iconContainer}>
            <button onClick={handleEditClick} className={styles.iconButton}>
              <IconEdit size={25} stroke={1.5} className={styles.iconEdit} />
            </button>
            <button onClick={handleDeleteClick} className={styles.iconButton}>
              <IconTrash size={25} stroke={1.5} className={styles.iconDelete} />
            </button>
            <button onClick={handleIconClick} className={styles.iconButton}>
              <IconFlagFilled
                size={25}
                stroke={1.5}
                className={styles.iconReport}
              />
            </button>
          </div>
        </div>
      </StyledBox>

      {showDeletePopup && (
        <DeletePopUp
          isVisible={showDeletePopup}
          onClose={() => setShowDeletePopup(false)}
          onDelete={handleDeleteDiscussion}
          heading="Delete Discussion"
          details="Are you sure you want to delete this discussion? Please note that all replies in your discussion will be deleted as well."
        />
      )}
    </div>
  );
}
