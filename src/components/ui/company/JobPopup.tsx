import React, { useState } from "react";
import styles from "./JobPopup.module.scss"; // Create this stylesheet for styling
import { toast } from "react-toastify";
import FormField from "../../form/FormField"; // Import FormField
import Button from "../../ui/Button"; // Import Button

interface JobPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (jobTitle: string, jobDescription: string) => Promise<void>;
}

const JobPopup: React.FC<JobPopupProps> = ({ isOpen, onClose, onSubmit }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (jobTitle.trim() === "") {
      toast.error("Job title cannot be blank.");
      return;
    }
    if (jobTitle.length > 100) {
      toast.error("Job title should not exceed 100 characters.");
      return;
    }
    if (jobDescription.trim() === "") {
      toast.error("Job description cannot be blank.");
      return;
    }
    if (jobDescription.length > 1500) {
      toast.error("Job description should not exceed 1500 characters.");
      return;
    }

    setLoading(true);
    try {
      await onSubmit(jobTitle, jobDescription);
      onClose();
    } catch (error) {
      toast.error("Failed to add job.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2 className={styles.title}>Add Job</h2>
        <div className={styles.separator}></div>
        <label className={styles.label}>Job Title</label>
        <FormField
          classNames={styles.input}
          type="text"
          placeholder="Enter Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          required
        />
        <label className={styles.label}>Job Description</label>
        <FormField
          classNames={styles.textarea}
          type="textarea"
          placeholder="Enter Job Description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          required
        />
        <div className={styles.buttonContainer}>
          <Button color="secondary" classNames={styles.cancelButton} onClick={onClose}>
            Cancel
          </Button>
          <Button color="secondary" classNames={styles.submitButton} onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobPopup; 