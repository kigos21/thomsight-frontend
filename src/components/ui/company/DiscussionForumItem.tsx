import { DiscussionForumItemProps } from "../../../types/props";
import { IconFlagFilled, IconTrash, IconEdit } from "@tabler/icons-react";
import Button from "../Button";

import styles from "./DiscussionForumItem.module.scss";
import StyledBox from "../../layout/StyledBox";
import { useState } from "react";

export default function DiscussionForumItem({
  classNames,
  style,
  internName,
  date,
  description,
  onDescriptionChange,
}: DiscussionForumItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tempDescription, setTempDescription] = useState<string>(description);

  const handleIconClick = () => {
    //click handling logic
    console.log("Icon clicked!");
  };

  const handleEditClick = () => {
    setIsEditing((state) => !state);
  };

  const handleSaveClick = () => {
    onDescriptionChange(tempDescription);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setTempDescription(description);
    setIsEditing(false);
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
            <button onClick={handleIconClick} className={styles.iconButton}>
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
    </div>
  );
}
