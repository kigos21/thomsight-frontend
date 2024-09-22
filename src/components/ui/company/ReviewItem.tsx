import { ReviewItemProps } from "../../../types/props";
import { IconFlagFilled, IconTrash, IconEdit } from "@tabler/icons-react";
import ButtonReview from "../ButtonReview";

import styles from "./ReviewItem.module.scss";
import StyledBox from "../../layout/StyledBox";

export default function ReviewItem({
  classNames,
  style,
  internName,
  date,
  rating,
  reviewDescription,
}: ReviewItemProps) {
  const handleIconClick = () => {
    //click handling logic
    console.log("Icon clicked!");
  };

  return (
    <div className={`${styles.container} ${classNames}`} style={{ ...style }}>
      <StyledBox paddedContainerClass={styles.styledBox}>
        <div className={styles.reviewContainer}>
          <div className={styles.reviewSubjectContainer}>
            <div className={styles.reviewerDetails}>
              <p className={styles.internName}>{internName}</p>
              <div className={styles.verticalDivider}></div>
              <h2 className={styles.rating}>{rating}</h2>
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
                    fill-rule="evenodd"
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
                    fill-rule="evenodd"
                    d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67"
                  />
                </svg>
                ###
              </ButtonReview>
            </div>
          </div>

          <p className={styles.reviewDescription}>{reviewDescription}</p>

          <div className={styles.iconContainer}>
            <button onClick={handleIconClick} className={styles.iconButton}>
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
