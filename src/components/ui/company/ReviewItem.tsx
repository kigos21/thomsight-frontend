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
import { FormEvent, useEffect, useRef, useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner";
import { useUser } from "../../../contexts/UserContext";
import DeletePopUp from "./DeletePopUp";
import ReportForm from "./ReportForm";
import DisplayProfile from "./DisplayProfile";

export default function ReviewItem({
  classNames,
  style,
  internName,
  date,
  rating,
  reviewDescription,
  onReviewChange,
  setSuccess,
  id,
  posted_by,
  onReviewDelete,
  setError,
  user_id,
}: ReviewItemProps) {
  // Local state for editing
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tempReview, setTempReview] = useState<{
    rating: string;
    description: string;
  }>({ rating: rating, description: reviewDescription });
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState<string>("");
  const { user } = useUser();
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [showReportPopup, setShowReportPopup] = useState<boolean>(false);
  const [selectedReportOption, setSelectedReportOption] = useState<
    string | null
  >(null);
  const [reportDescription, setReportDescription] = useState<string>("");
  const [reportError, setReportError] = useState<string | null>(null);
  const [reportSuccess, setReportSuccess] = useState<string | null>(null);

  // Used for firing off HTML validation for rating input[type=number] element
  const ratingRef = useRef<HTMLFormElement>(null);

  const [upvotes, setUpvotes] = useState<number>(0);
  const [downvotes, setDownvotes] = useState<number>(0);
  const [userVote, setUserVote] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState<boolean>(false);

  useEffect(() => {
    const fetchVotes = async () => {
      const response = await axiosInstance.get(`/api/review/${id}/votes`);
      setUpvotes(response.data.upvotes);
      setDownvotes(response.data.downvotes);
      setUserVote(response.data.userVote);
    };

    fetchVotes();
  }, [id]);

  const handleVote = async (voteType: "up" | "down") => {
    try {
      console.log("Hello");
      await axiosInstance.post(`/api/review/${id}/vote`, {
        vote: voteType,
      });
      console.log("Here");
      if (voteType === "up") {
        setUpvotes((prev) => (userVote === "up" ? prev - 1 : prev + 1));
        setDownvotes((prev) => (userVote === "down" ? prev - 1 : prev));
      } else {
        setDownvotes((prev) => (userVote === "down" ? prev - 1 : prev + 1));
        setUpvotes((prev) => (userVote === "up" ? prev - 1 : prev));
      }
      setUserVote(userVote === voteType ? null : voteType);
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

  const updateReview = async () => {
    const updatedReview = {
      rating: tempReview.rating,
      description: tempReview.description,
    };

    try {
      setLoading("Updating review...");
      await axiosInstance.put(
        `/api/company/${slug}/review/${id}/update`,
        updatedReview
      );
      setSuccess("Review updated successfully");
      onReviewChange(updatedReview);
    } catch (error) {
      console.error("Error updating review:", error);
      setError("Could not update review. Please try again.");
    } finally {
      setLoading("");
    }
  };

  const handleEditClick = () => {
    setError("");
    setSuccess("");
    setIsEditing((state) => !state);
  };

  const handleSaveClick = async () => {
    if (ratingRef.current && !ratingRef.current!.checkValidity()) {
      ratingRef.current.reportValidity();
      return;
    }
    await updateReview();
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setTempReview({ rating: rating, description: reviewDescription });
    setIsEditing(false);
  };

  const handleRatingSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleDeleteClick = () => {
    setSuccess("");
    setError("");
    setShowDeletePopup(true);
  };

  const handleDeleteReview = async () => {
    try {
      setLoading("Deleting review...");
      await axiosInstance.delete(`/api/company/${slug}/review/${id}/delete`);
      if (onReviewDelete) {
        onReviewDelete(id);
      }
      setSuccess("Deleted review successfully");
    } catch (err) {
      console.error("Error deleting review:" + err);
      setError("Could not delete review. Please try again.");
    } finally {
      setLoading("");
      setShowDeletePopup(false);
    }
  };

  const handleReportClick = () => {
    setSuccess("");
    setError("");
    setShowReportPopup(true);
  };

  const handleSubmitReport = async (e: FormEvent) => {
    e.preventDefault();
    setReportError(null);
    setReportSuccess(null);

    if (!selectedReportOption) {
      setReportError("Please select an issue type.");
      return;
    }
    if (!reportDescription) {
      setReportError("Please fill out the reason");
      return;
    }

    setLoading("Submitting report...");
    try {
      const response = await axiosInstance.post(`/api/report/feedback/${id}`, {
        id,
        issue: selectedReportOption,
        reason: reportDescription,
      });
      if (response.status === 200) {
        setReportSuccess("Report submitted successfully.");
        setSelectedReportOption(null);
        setReportDescription("");
      }
    } catch (error) {
      setReportError(
        "There was an error submitting the report. Please try again." + error
      );
    } finally {
      setLoading("");
    }
  };

  return (
    <div className={`${styles.container} ${classNames}`} style={{ ...style }}>
      {loading && <Spinner message={loading} />}
      <StyledBox paddedContainerClass={styles.styledBox}>
        <div className={styles.reviewContainer}>
          <div className={styles.reviewSubjectContainer}>
            <div className={styles.reviewerDetails}>
              <p
                className={styles.internName}
                onClick={() => setShowProfile(true)}
              >
                {internName}
              </p>
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
            {date && <p className={styles.date}>{date.toString()}</p>}

            <div className={styles.replyButtonContainer}>
              <ButtonReview
                classNames={`${styles.replyButton} ${styles.up} ${userVote === "up" ? styles.active : ""}`}
                onClick={() => handleVote("up")}
              >
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
                {upvotes}
              </ButtonReview>
              <ButtonReview
                classNames={`${styles.replyButton} ${styles.down} ${userVote === "down" ? styles.active : ""}`}
                onClick={() => handleVote("down")}
              >
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
                {downvotes}
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
            {user?.id == posted_by && (
              <button onClick={handleEditClick} className={styles.iconButton}>
                <IconEdit size={25} stroke={1.5} className={styles.iconEdit} />
              </button>
            )}
            {user?.id == posted_by && (
              <button onClick={handleDeleteClick} className={styles.iconButton}>
                <IconTrash
                  size={25}
                  stroke={1.5}
                  className={styles.iconDelete}
                />
              </button>
            )}
            {user?.id != posted_by && (
              <button onClick={handleReportClick} className={styles.iconButton}>
                <IconFlagFilled
                  size={25}
                  stroke={1.5}
                  className={styles.iconReport}
                />
              </button>
            )}
          </div>
        </div>
      </StyledBox>

      {showDeletePopup && (
        <DeletePopUp
          isVisible={showDeletePopup}
          onClose={() => setShowDeletePopup(false)}
          onDelete={handleDeleteReview}
          heading="Delete Review"
          details="Are you sure you want to delete this review?"
        />
      )}

      {showReportPopup && (
        <ReportForm
          isVisible={showReportPopup}
          onClose={() => setShowReportPopup(false)}
          selectedOption={selectedReportOption}
          setSelectedOption={setSelectedReportOption}
          description={reportDescription}
          setDescription={setReportDescription}
          handleSubmit={handleSubmitReport}
          error={reportError}
          successMessage={reportSuccess}
          loading={loading === "Submitting report..."}
        ></ReportForm>
      )}

      {showProfile && (
        <DisplayProfile
          onClose={() => setShowProfile(false)}
          user_id={user_id}
          isVisible={showProfile}
        />
      )}
    </div>
  );
}
