import { ReviewItemProps } from "../../../types/props";
import { IconFlagFilled, IconTrash, IconStarFilled } from "@tabler/icons-react";
import ButtonReview from "../ButtonReview";

import styles from "./ReviewItem.module.scss";
import StyledBox from "../../layout/StyledBox";
import { FormEvent, useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner";
import { useUser } from "../../../contexts/UserContext";
import DeletePopUp from "./DeletePopUp";
import ReportForm from "./ReportForm";
import DisplayProfile from "./DisplayProfile";
import { toast } from "react-toastify";

export default function ReviewItem({
  classNames,
  style,
  internName,
  date,
  rating,
  reviewDescription,
  id,
  posted_by,
  onReviewDelete,
  user_id,
  reviewImage,
}: ReviewItemProps) {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState<string>("");
  const { user } = useUser();
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [showReportPopup, setShowReportPopup] = useState<boolean>(false);
  const [selectedReportOption, setSelectedReportOption] = useState<
    string | null
  >(null);
  const [reportDescription, setReportDescription] = useState<string>("");

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
      await axiosInstance.post(`/api/review/${id}/vote`, {
        vote: voteType,
      });

      if (voteType === "up") {
        if (userVote === "up") {
          setUpvotes((prev) => prev - 1);
          toast.success("Removed upvote");
        } else {
          setUpvotes((prev) => prev + 1);
          if (userVote === "down") setDownvotes((prev) => prev - 1);
          toast.success("Upvoted");
        }
      } else {
        if (userVote === "down") {
          setDownvotes((prev) => prev - 1);
          toast.success("Removed downvote");
        } else {
          setDownvotes((prev) => prev + 1);
          if (userVote === "up") setUpvotes((prev) => prev - 1);
          toast.success("Downvoted");
        }
      }
      setUserVote(userVote === voteType ? null : voteType);
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

  const handleDeleteClick = () => {
    setShowDeletePopup(true);
  };

  const handleDeleteReview = async () => {
    try {
      setShowDeletePopup(false);
      setLoading("Deleting review...");
      await axiosInstance.delete(`/api/company/${slug}/review/${id}/delete`);
      if (onReviewDelete) {
        onReviewDelete(id);
      }
      toast.success("Deleted review successfully");
    } catch (err) {
      console.error("Error deleting review:" + err);
      toast.error("Could not delete review. Please try again.");
    } finally {
      setLoading("");
    }
  };

  const handleReportClick = () => {
    setShowReportPopup(true);
  };

  const handleSubmitReport = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedReportOption) {
      toast.error("Please select an issue type.");
      return;
    }
    if (!reportDescription) {
      toast.error("Please fill out the reason");
      return;
    }
    if (reportDescription.length > 255) {
      toast.error("Reason should be limited to 255 characters");
      return;
    }
    setShowReportPopup(false);
    setLoading("Submitting report...");
    try {
      const response = await axiosInstance.post(`/api/report/feedback/${id}`, {
        id,
        issue: selectedReportOption,
        reason: reportDescription,
      });
      if (response.status === 200) {
        toast.success("Report submitted successfully.");
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error(error);
    } finally {
      setLoading("");
      setSelectedReportOption(null);
      setReportDescription("");
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
              <div className={styles.ratingContainer}>
                <h2 className={styles.rating}>{rating}</h2>
                <IconStarFilled width={16} />
              </div>
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

          {reviewImage &&
            reviewImage !== "http://localhost:8000/storage/uploads/reviews" && (
              <img className={styles.image} src={reviewImage} alt={"Test"} />
            )}

          <p
            className={styles.reviewDescription}
            dangerouslySetInnerHTML={{
              __html: reviewDescription,
            }}
          ></p>

          <div className={styles.iconContainer}>
            {/* {user?.id == posted_by && (
              <button onClick={handleEditClick} className={styles.iconButton}>
                <IconEdit size={25} stroke={1.5} className={styles.iconEdit} />
              </button>
            )} */}
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
