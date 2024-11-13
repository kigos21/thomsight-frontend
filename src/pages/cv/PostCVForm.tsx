import React, { useRef, useState } from "react";
import styles from "./PostCVForm.module.scss";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import axiosInstance from "../../services/axiosInstance";
import { toast } from "react-toastify";

interface PostCVFormProps {
  onClose?: () => void;
}

const PostCVForm: React.FC<PostCVFormProps> = () => {
  const [description, setDescription] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Only PDF files are allowed.");
        setCvFile(null);
      } else if (file.size > 2 * 1024 * 1024) {
        toast.error("File size should not exceed 2MB.");
        setCvFile(null);
      } else {
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
      toast.error("Description cannot exceed 255 characters.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cvFile) {
      toast.error("Please upload a PDF file.");
      return;
    }
    if (description.length > 255) {
      toast.error("Description must be 255 characters or less.");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("cvFile", cvFile);

    try {
      setLoading("Submitting CV...");
      await axiosInstance.post("/api/upload-cv", formData);
      toast.success("CV successfully uploaded!");
      setDescription("");
      setCvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      toast.error("An error occurred while uploading. Please try again.");
      console.error(error);
    } finally {
      setLoading("");
    }
  };

  return (
    <div>
      {loading && <Spinner message={loading} />}
      <div className={styles.formContainer}>
        <h2 className={styles.h2}>Post Your CV</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
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
