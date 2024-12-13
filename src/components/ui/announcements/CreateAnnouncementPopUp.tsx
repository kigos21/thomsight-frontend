import { useEffect, useRef, useState } from "react";
import styles from "./CreateAnnouncementPopup.module.scss";
import { toast } from "react-toastify";
import { createAnnouncement } from "../../../api/adminCRUD";
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";
import { containsBadWords } from "../../../badWordsFilter";
import axiosInstance from "../../../services/axiosInstance";
import FormField from "../../form/FormField";
import Button from "../Button";
import { Announcement } from "../../../types/types";
import Quill from "quill";

interface CreateAnnouncementPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newAnnouncement: Announcement) => void;
}

const CreateAnnouncementPopup: React.FC<CreateAnnouncementPopupProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [subject, setSubject] = useState<string>("");
  const [details, setDetails] = useState<string>("");
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
            [{ indent: "-1" }, { indent: "+1" }],
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
      const newAnnouncement = await createAnnouncement(subject, details);
      toast.success("Announcement created successfully!");
      onAdd(newAnnouncement);
      navigate("/announcements");
    } catch (error) {
      console.error("Error creating announcement:", error);
      toast.error("Failed to create announcement");
    } finally {
      setLoading(false);
      onClose();
      await axiosInstance.post("/api/announcements/email", {
        subject,
        details,
      });
      resetForm();
    }
  };

  const resetForm = () => {
    setSubject("");
    setDetails("");
    if (quillInstance.current) {
      quillInstance.current.root.innerHTML = "";
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className={styles.overlay}>
      {loading && <Spinner message="Creating announcement..." />}
      <div className={styles.popup}>
        <h2 className={styles.title}>Create Announcement</h2>
        <div className={styles.separator}></div>
        <div className={styles.formContainer}>
          <label className={styles.label}>Subject</label>
          <FormField
            classNames={styles.input}
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
          <Button
            color="black"
            classNames={styles.cancelButton}
            roundness="sm-rounded"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            color="secondary"
            classNames={styles.submitButton}
            roundness="sm-rounded"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateAnnouncementPopup;
