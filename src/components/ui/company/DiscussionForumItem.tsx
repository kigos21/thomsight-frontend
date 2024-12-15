import { DiscussionForumItemProps } from "../../../types/props";
import { IconFlagFilled, IconTrash, IconEdit } from "@tabler/icons-react";
import Button from "../Button";

import styles from "./DiscussionForumItem.module.scss";
import StyledBox from "../../layout/StyledBox";
import { FormEvent, useEffect, useRef, useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { useParams } from "react-router-dom";
import DeletePopUp from "./DeletePopUp";
import { containsBadWords } from "../../../badWordsFilter";
import { useUser } from "../../../contexts/UserContext";
import ReportForm from "./ReportForm";
import DisplayProfile from "./DisplayProfile";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import DOMPurify from "dompurify";
import Quill from "quill";

export default function DiscussionForumItem({
  classNames,
  style,
  internName,
  date,
  description,
  onChange,
  id,
  setLoading,
  onDiscussionDelete,
  posted_by,
  handleReplyClick,
  user_id,
  image,
}: DiscussionForumItemProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
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

  const quillRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);

  const handleEditClick = () => {
    setIsEditing((state) => !state);
  };

  useEffect(() => {
    if (quillInstance.current && !isEditing) {
      quillInstance.current = null;
    }

    if (!quillRef.current || quillInstance.current || !isEditing) return;

    quillInstance.current = new Quill(quillRef.current, {
      theme: "snow",
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        ],
      },
    });

    quillInstance.current.root.innerHTML = tempDescription;

    quillInstance.current.on("text-change", () => {
      const htmlContent = quillInstance.current?.root.innerHTML || "";
      setTempDescription(htmlContent);
    });
  }, [isEditing]);

  const handleSaveClick = async () => {
    const plainTextDescription =
      new DOMParser()
        .parseFromString(tempDescription, "text/html")
        .body.textContent?.trim() || "";

    if (plainTextDescription === "") {
      toast.error("New description can not be blank");
      return;
    }
    if (containsBadWords(tempDescription)) {
      toast.error("New description contains foul language");
      return;
    }
    if (plainTextDescription.length > 2500) {
      toast.error("Description should be limited to 2500 characters");
      return;
    }

    const formData = new FormData();
    formData.append("description", tempDescription);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      setLoading("Updating discussion...");

      const response = await axiosInstance.post(
        `/api/company/${slug}/discussion/${id}/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onChange(tempDescription, response.data.image);
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
      setShowDeletePopup(false);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  return (
    <div className={`${styles.container} ${classNames}`} style={{ ...style }}>
      {reportLoading && <Spinner message={reportLoading} />}
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

          {image !== "http://localhost:8000/storage/uploads/discussions" && (
            <img className={styles.image} src={image} alt={"Test"} />
          )}

          {isEditing ? (
            <div className={styles.editDescriptionSection}>
              <div>
                <div className={styles.quillWrapper}>
                  <div ref={quillRef} className={styles.quillContainer}></div>
                </div>
                <div className={styles.fileWrapper}>
                  <p className={styles.formTitle}>
                    Change Image (optional, max 4 MB)
                  </p>
                  <input
                    id="fileInput"
                    type="file"
                    accept=".jpeg, .jpg, .png"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
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
            <p
              className={styles.discussionForumDescription}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(description),
              }}
            ></p>
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
