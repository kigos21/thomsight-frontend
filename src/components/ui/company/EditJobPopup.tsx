import React, { useState } from "react";
import styles from "./EditJobPopup.module.scss";
import { toast } from "react-toastify";
import FormField from "../../form/FormField";
import Button from "../Button";
import { updateJob } from "../../../api/companyCRUD";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner";

interface EditJobPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (jobTitle: string, jobDescription: string) => Promise<void>;
  initialJobTitle: string;
  initialJobDescription: string;
  initialJobId: number;
}

const EditJobPopup: React.FC<EditJobPopupProps> = ({
  isOpen,
  onClose,
  onSave,
  initialJobTitle,
  initialJobDescription,
  initialJobId,
}) => {
  const [jobTitle, setJobTitle] = useState(initialJobTitle);
  const [jobDescription, setJobDescription] = useState(initialJobDescription);
  const [loading, setLoading] = useState(false);
  const { slug } = useParams<{ slug: string }>();

  if (!slug) return;

  const handleSave = async () => {
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

    try {
      setLoading(true);
      await updateJob(slug, initialJobId, {
        title: jobTitle,
        description: jobDescription,
      });
      await onSave(jobTitle, jobDescription);
      onClose();
    } catch (error) {
      toast.error("Failed to update job.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      {loading && <Spinner message="Updating job..." />}
      <div className={styles.popup}>
        <h2 className={styles.title}>Edit Job</h2>
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
          <Button
            color="secondary"
            classNames={styles.cancelButton}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            color="secondary"
            classNames={styles.submitButton}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditJobPopup;
