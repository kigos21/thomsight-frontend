import { ReviewItemProps } from "../../../types/props";
import {
  IconFlagFilled,
  IconTrash,
  IconEdit,
  IconStarFilled,
} from "@tabler/icons-react";
import ButtonReview from "../ButtonReview";

import styles from "./ReviewItem.module.scss";
import StyledBox from "../../layout/StyledBox";
import { FormEvent, useRef, useState } from "react";

export default function ReviewItem({
  classNames,
  style,
  internName,
  date,
  rating,
  reviewDescription,
  onReviewChange,
}: ReviewItemProps) {
  // Local state for editing
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tempReview, setTempReview] = useState<{
    rating: string;
    description: string;
  }>({ rating: rating, description: reviewDescription });

  // Used for firing off HTML validation for rating input[type=number] element
  const ratingRef = useRef<HTMLFormElement>(null);

  const handleIconClick = () => {
    //click handling logic
    console.log("Icon clicked!");
  };

  const handleEditClick = () => {
    setIsEditing((state) => !state);
  };

  const handleSaveClick = () => {
    if (ratingRef.current && !ratingRef.current!.checkValidity()) {
      ratingRef.current.reportValidity(); // This will display the native validation error messages
      return;
    }
    onReviewChange(tempReview);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setTempReview({ rating: rating, description: reviewDescription }); // Reset the temp description to discard changes
    setIsEditing(false);
  };

  const handleRatingSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={`${styles.container} ${classNames}`} style={{ ...style }}>
      <StyledBox paddedContainerClass={styles.styledBox}>
        <div className={styles.reviewContainer}>
          <div className={styles.reviewSubjectContainer}>
            <div className={styles.reviewerDetails}>
              <p className={styles.internName}>{internName}</p>
              <div className={styles.verticalDivider}></div>
              {!isEditing ? (
                <div className={styles.ratingContainer}>
                  <h2 className={styles.rating}>{rating}</h2>
                  <IconStarFilled width={16} />
                </div>
              ) : (
                <form onSubmit={(e) => handleRatingSubmit(e)} ref={ratingRef}>
                  <input
                    className={styles.ratingTextfield}
                    type="number"
                    name="rating"
                    id="rating"
                    placeholder="5"
                    value={tempReview.rating}
                    onChange={(e) =>
                      setTempReview((current) => {
                        return { ...current, rating: e.target.value };
                      })
                    }
                    min="1"
                    max="5"
                  />
                </form>
              )}
            </div>
            <p className={styles.date}>{date}</p>

            <div className={styles.replyButtonContainer}>
              <ButtonReview classNames={`${styles.replyButton} ${styles.up}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-compact-up"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894z"
                  />
                </svg>
                ###
              </ButtonReview>
              <ButtonReview classNames={`${styles.replyButton} ${styles.down}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-chevron-compact-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67"
                  />
                </svg>
                ###
              </ButtonReview>
            </div>
          </div>

          {isEditing ? (
            <div className={styles.editReviewDescriptionSection}>
              <textarea
                className={styles.descriptionTextarea}
                value={tempReview.description}
                onChange={(e) =>
                  setTempReview((current) => {
                    return { ...current, description: e.target.value };
                  })
                }
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
            <p className={styles.reviewDescription}>{reviewDescription}</p>
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
