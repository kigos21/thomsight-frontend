import { DiscussionForumItemProps } from "../../../types/props";
import { IconFlagFilled, IconTrash, IconEdit } from "@tabler/icons-react";
import Button from "../Button";

import styles from "./DiscussionForumItem.module.scss";
import StyledBox from "../../layout/StyledBox";
import { FormEvent, useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { useParams } from "react-router-dom";
import DeletePopUp from "./DeletePopUp";
import { containsBadWords } from "../../../badWordsFilter";
import { useUser } from "../../../contexts/UserContext";
import ReportForm from "./ReportForm";
import DisplayProfile from "./DisplayProfile";
import { toast } from "react-toastify";

export default function DiscussionForumItem({
  classNames,
  style,
  internName,
  date,
  description,
  onDescriptionChange,
  id,
  setLoading,
  onDiscussionDelete,
  posted_by,
  handleReplyClick,
  user_id,
}: DiscussionForumItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tempDescription, setTempDescription] = useState<string>(description);
  const { slug } = useParams<{ slug: string }>();
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const { user } = useUser();
  const [showReportPopup, setShowReportPopup] = useState<boolean>(false);
  const [selectedReportOption, setSelectedReportOption] = useState<
    string | null
  >(null);
  const [reportDescription, setReportDescription] = useState<string>("");
  const [reportLoading, setReportLoading] = useState<string>("");

  const [showProfile, setShowProfile] = useState<boolean>(false);

  const handleEditClick = () => {
    setIsEditing((state) => !state);
  };

  const handleSaveClick = async () => {
    if (containsBadWords(tempDescription)) {
      toast.error("New description contains foul language");
      return;
    }
    if (tempDescription.length > 2000) {
      toast.error("Description should be limited to 2000 characters");
      return;
    }
    try {
      setLoading("Updating discussion...");
      await axiosInstance.put(`/api/company/${slug}/discussion/${id}/update`, {
        description: tempDescription,
      });

      onDescriptionChange(tempDescription);
      setIsEditing(false);
      toast.success("Updated discussion successfully");
    } catch (error) {
      console.error("Error updating the discussion:", error);
      toast.error("Could not update discussion. Please try again.");
    } finally {
      setLoading("");
    }
  };

  const handleCancelClick = () => {
    setTempDescription(description);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setShowDeletePopup(true);
  };

  const handleDeleteDiscussion = async () => {
    try {
      setLoading("Deleting discussion...");
      await axiosInstance.delete(
        `/api/company/${slug}/discussion/${id}/delete`
      );
      if (onDiscussionDelete) {
        onDiscussionDelete(id);
      }
      toast.success("Deleted discussion successfully");
    } catch (err) {
      console.error("Error deleting discussion:" + err);
      toast.error("Could not delete discussion. Please try again.");
    } finally {
      setLoading("");
      setShowDeletePopup(false);
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

    setReportLoading("Submitting report...");
    try {
      const response = await axiosInstance.post(
        `/api/report/discussion/${id}`,
        {
          id,
          issue: selectedReportOption,
          reason: reportDescription,
        }
      );
      if (response.status === 200) {
        toast.success("Report submitted successfully.");
        setSelectedReportOption(null);
        setReportDescription("");
      }
    } catch (error) {
      toast.error(
        "There was an error submitting the report. Please try again."
      );
      console.error(error);
    } finally {
      setReportLoading("");
    }
  };

  return (
    <div className={`${styles.container} ${classNames}`} style={{ ...style }}>
      <StyledBox paddedContainerClass={styles.styledBox}>
        <div className={styles.forumContainer}>
          <div className={styles.ForumSubjectContainer}>
            <p
              className={styles.internName}
              onClick={() => setShowProfile(true)}
            >
              {internName}
            </p>
            <p className={styles.date}>{date}</p>

            <div className={styles.replyButtonContainer}>
              <Button
                color="black"
                roundness="rounded"
                classNames={styles.replyButton}
                onClick={handleReplyClick}
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
            {user?.id === posted_by && (
              <button onClick={handleEditClick} className={styles.iconButton}>
                <IconEdit size={25} stroke={1.5} className={styles.iconEdit} />
              </button>
            )}
            {user?.id === posted_by && (
              <button onClick={handleDeleteClick} className={styles.iconButton}>
                <IconTrash
                  size={25}
                  stroke={1.5}
                  className={styles.iconDelete}
                />
              </button>
            )}
            {user?.id !== posted_by && (
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
          onDelete={handleDeleteDiscussion}
          heading="Delete Discussion"
          details="Are you sure you want to delete this discussion? Please note that all replies in your discussion will be deleted as well."
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
          loading={reportLoading === "Submitting report..."}
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
