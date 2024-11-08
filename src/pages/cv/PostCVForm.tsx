import React, { useRef, useState } from "react";
import styles from "./PostCVForm.module.scss";
import Button from "../../components/ui/Button";
import ValidationError from "../../components/form/ValidationError";
import Spinner from "../../components/ui/Spinner";
import axiosInstance from "../../services/axiosInstance";
import SuccessMessage from "../../components/form/SuccessMessage";

interface PostCVFormProps {
  onClose?: () => void;
}

const PostCVForm: React.FC<PostCVFormProps> = () => {
  const [description, setDescription] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [cvError, setCvError] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setCvError("Only PDF files are allowed.");
        setCvFile(null);
      } else if (file.size > 2 * 1024 * 1024) {
        setCvError("File size should not exceed 2MB.");
        setCvFile(null);
      } else {
        setCvError("");
        setCvFile(file);
      }
    }
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const text = e.target.value;
    if (text.length <= 255) {
      setDescription(text);
    } else {
      setDescriptionError("Description cannot exceed 255 characters.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCvError("");
    setDescriptionError("");
    setError("");
    setSuccess("");

    if (!cvFile) {
      setCvError("Please upload a PDF file.");
      return;
    }
    if (description.length > 255) {
      setDescriptionError("Description must be 255 characters or less.");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("cvFile", cvFile);

    try {
      setLoading("Submitting CV...");
      await axiosInstance.post("/api/upload-cv", formData);
      setSuccess("CV successfully uploaded!");
      setDescription("");
      setCvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      setError("An error occurred while uploading. Please try again.");
      console.error(error);
    } finally {
      setLoading("");
    }
  };

  return (
    <div>
      {error && <ValidationError message={error} />}
      {loading && <Spinner message={loading} />}
      {success && <SuccessMessage message={success} />}
      <div className={styles.formContainer}>
        <h2 className={styles.h2}>Post Your CV</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
            {descriptionError && <ValidationError message={descriptionError} />}
            <textarea
              className={styles.textarea}
              id="description"
              name="description"
              rows={4}
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="cvFile" className={styles.label}>
              Upload CV
            </label>
            {cvError && <ValidationError message={cvError} />}
            <input
              type="file"
              id="cvFile"
              name="cvFile"
              className={styles.inputFile}
              accept=".pdf"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </div>
          <Button
            type="submit"
            color={"primary"}
            roundness={"rounded"}
            classNames={styles.submitButton}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PostCVForm;
