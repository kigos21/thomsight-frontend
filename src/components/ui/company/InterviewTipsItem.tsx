import { IconFlagFilled, IconTrash, IconEdit } from "@tabler/icons-react";
import PaddedContainer from "../../layout/PaddedContainer";
import styles from "./InterviewTipsItem.module.scss";
import { FormEvent, useState } from "react";
import DeletePopUp from "./DeletePopUp";
import axiosInstance from "../../../services/axiosInstance";
import { useParams } from "react-router-dom";
import ReportForm from "./ReportForm";
import { useUser } from "../../../contexts/UserContext";
import DisplayProfile from "./DisplayProfile";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import { containsBadWords } from "../../../badWordsFilter";
import Button from "../Button";

export interface InterviewTipsItemProps {
  id?: number;
  classNames?: string;
  style?: React.CSSProperties;
  subjectHeading: string;
  internName?: string;
  tipDescription: string;
  onTipChange?: (updatedTip: { title: string; description: string }) => void;
  onTipDelete?: (id: number | undefined) => void;
  setLoading: React.Dispatch<React.SetStateAction<string>>;
  poster_id: number | undefined;
}

export default function InterviewTipsItem({
  id,
  classNames,
  style,
  subjectHeading,
  internName,
  tipDescription,
  onTipChange,
  onTipDelete,
  setLoading,
  poster_id,
}: InterviewTipsItemProps) {
  const { slug } = useParams<{ slug: string }>();
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [showReportPopup, setShowReportPopup] = useState<boolean>(false);
  const [selectedReportOption, setSelectedReportOption] = useState<
    string | null
  >(null);
  const [reportDescription, setReportDescription] = useState<string>("");
  const [reportLoading, setReportLoading] = useState<string>("");

  // Local state for editing
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tempTip, setTempTip] = useState<{
    title: string;
    description: string;
  }>({
    title: subjectHeading,
    description: tipDescription,
  });

  const { user } = useUser();
  const [showProfile, setShowProfile] = useState<boolean>(false);

  const handleEditClick = () => {
    setIsEditing((state) => !state);
  };

  const handleSaveClick = async () => {
    if (tempTip.title.length > 100) {
      toast.error("Title should be limited to 100 characters");
      return;
    }
    if (tempTip.description.length > 1500) {
      toast.error("Interview tips should be limited to 1500 characters");
      return;
    }
    if (containsBadWords(tempTip.title)) {
      toast.error("Title contains foul language");
      return;
    }
    if (containsBadWords(tempTip.description)) {
      toast.error("Description contains foul language");
      return;
    }
    if (onTipChange) {
      setLoading("Updating tip...");
      try {
        await axiosInstance.put(
          `/api/company/${slug}/tip/${id}/update`,
          tempTip
        );
        toast.success("Tip updated successfully");
        onTipChange(tempTip);
      } catch (error) {
        console.error("Error updating tip:", error);
        toast.error("Could not update tip. Please try again.");
      } finally {
        setLoading("");
        setIsEditing(false);
      }
    }
  };

  const handleCancelClick = () => {
    setTempTip({ title: subjectHeading, description: tipDescription });
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setShowDeletePopup(true);
  };

  const handleDelete = async () => {
    try {
      setShowDeletePopup(false);
      setLoading("Deleting interview tip...");
      await axiosInstance.delete(`/api/company/${slug}/tip/${id}/delete`);
      if (onTipDelete) {
        onTipDelete(id);
      }
      toast.success("Deleted interview tip successfully");
    } catch (err) {
      console.error("Error deleting interview tip:" + err);
      toast.error("Could not delete interview tip. Please try again.");
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
    setReportLoading("Submitting report...");
    try {
      const response = await axiosInstance.post(`/api/report/tip/${id}`, {
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
      setReportLoading("");
      setSelectedReportOption(null);
      setReportDescription("");
    }
  };

  return (
    <div className={`${styles.container} ${classNames || ""}`} style={style}>
      {reportLoading && <Spinner message={reportLoading} />}
      <PaddedContainer classNames={styles.paddedContainer}>
        <div className={styles.tipsDetailsContainer}>
          {isEditing ? (
            <div className={styles.editTipSection}>
              <input
                className={styles.titleInput}
                type="text"
                value={tempTip.title}
                onChange={(e) =>
                  setTempTip((current) => ({
                    ...current,
                    title: e.target.value,
                  }))
                }
              />
              <textarea
                className={styles.descriptionTextarea}
                value={tempTip.description}
                onChange={(e) =>
                  setTempTip((current) => ({
                    ...current,
                    description: e.target.value,
                  }))
                }
                rows={5}
              />
              <div className={styles.editButtons}>
                <Button
                  onClick={handleCancelClick}
                  classNames={styles.cancelButton}
                  roundness="sm-rounded"
                  color="black"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveClick}
                  classNames={styles.saveButton}
                  roundness="sm-rounded"
                  color="secondary"
                >
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <div className={styles.interviewTipsContainer}>
              <div className={styles.tipsSubjectContainer}>
                <p className={styles.subjectHeading}>{subjectHeading}</p>
                {internName && (
                  <p
                    className={styles.internName}
                    onClick={() => setShowProfile(true)}
                  >
                    {internName}
                  </p>
                )}
              </div>
              <p className={styles.jobDescription}>{tipDescription}</p>
            </div>
          )}
          <div className={styles.iconContainer}>
            {user?.id === poster_id && (
              <button onClick={handleEditClick} className={styles.iconButton}>
                <IconEdit size={25} stroke={1.5} className={styles.iconEdit} />
              </button>
            )}
            {user?.id === poster_id && onTipDelete && (
              <button onClick={handleDeleteClick} className={styles.iconButton}>
                <IconTrash
                  size={25}
                  stroke={1.5}
                  className={styles.iconDelete}
                />
              </button>
            )}
            {user?.id !== poster_id && (
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

        {showDeletePopup && (
          <DeletePopUp
            isVisible={showDeletePopup}
            onClose={() => setShowDeletePopup(false)}
            onDelete={handleDelete}
            heading="Delete Interview Tip"
            details="Are you sure you want to delete this interview tip?"
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
      </PaddedContainer>

      {showProfile && (
        <DisplayProfile
          onClose={() => setShowProfile(false)}
          user_id={poster_id}
          isVisible={showProfile}
        />
      )}
    </div>
  );
}
