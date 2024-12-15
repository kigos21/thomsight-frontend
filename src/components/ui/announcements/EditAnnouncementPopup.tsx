import styles from "./CreateAnnouncementPopUp.module.scss";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { updateAnnouncement } from "../../../api/adminCRUD"; // Assuming you have an update function
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";
import { containsBadWords } from "../../../badWordsFilter";
import { Announcement } from "../../../types/types";
import Quill from "quill";

interface EditAnnouncementPopupProps {
  isOpen: boolean;
  onClose: () => void;
  announcement: Announcement;
  onUpdate: (updatedAnnouncement: Announcement) => void;
}

const EditAnnouncementPopup: React.FC<EditAnnouncementPopupProps> = ({
  isOpen,
  onClose,
  announcement,
  onUpdate,
}) => {
  const [subject, setSubject] = useState<string>(announcement.subject);
  const [details, setDetails] = useState<string>(announcement.details);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const quillRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);

  useEffect(() => {
    if (isOpen && quillRef.current) {
      if (quillInstance.current) {
        quillInstance.current.off("text-change");
        quillInstance.current = null;
      }

      quillInstance.current = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
            [{ align: [] }],
          ],
        },
      });

      quillInstance.current.root.innerHTML = details;

      quillInstance.current.on("text-change", () => {
        const htmlContent = quillInstance.current?.root.innerHTML || "";
        setDetails(htmlContent);
      });
    }

    return () => {
      if (quillInstance.current) {
        quillInstance.current.off("text-change");
        quillInstance.current = null;
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (subject.trim() === "") {
      toast.error("Subject cannot be blank");
      return;
    }
    if (details.trim() === "") {
      toast.error("Details cannot be blank");
      return;
    }
    if (containsBadWords(subject)) {
      toast.error("Subject contains foul language");
      return;
    }
    if (containsBadWords(details)) {
      toast.error("Details contains foul language");
      return;
    }
    if (subject.length > 100) {
      toast.error("Subject should be limited to 100 characters");
      return;
    }
    if (details.length > 500) {
      toast.error("Details should be limited to 500 characters");
      return;
    }

    try {
      setLoading(true);
      const updatedAnnouncement = await updateAnnouncement(announcement.id, subject, details);
      toast.success("Announcement updated successfully!");
      onUpdate(updatedAnnouncement);
      navigate("/announcements");
    } catch (error) {
      console.error("Error updating announcement:", error);
      toast.error("Failed to update announcement");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const resetForm = () => {
    setSubject(announcement.subject);
    setDetails(announcement.details);
    if (quillInstance.current) {
      quillInstance.current.root.innerHTML = details;
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className={styles.overlay}>
      {loading && <Spinner message="Updating announcement..." />}
      <div className={styles.popup}>
        <h2 className={styles.title}>Edit Announcement</h2>
        <div className={styles.separator}></div>
        <div className={styles.formContainer}>
          <label className={styles.label}>Subject</label>
          <input
            className={styles.input}
            type="text"
            placeholder="Announcement Title"
            required={true}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <label className={styles.label}>Details</label>
          <div className={styles.quillWrapper}>
            <div ref={quillRef} className={styles.quillContainer}></div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton} onClick={handleClose}>
            Cancel
          </button>
          <button className={styles.submitButton} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAnnouncementPopup; 