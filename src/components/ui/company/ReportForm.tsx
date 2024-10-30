import React, { useState } from "react";
import styles from "./ReportForm.module.scss";
import { ReportFormProps } from "../../../types/props";
import axiosInstance from "../../../services/axiosInstance"; // Adjust path as needed
import ValidationError from "../../form/ValidationError";
import SuccessMessage from "../../form/SuccessMessage";

const ReportForm: React.FC<ReportFormProps> = ({ isVisible, onClose, id }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isVisible) return null;

  const handleCheckboxChange = (value: string) => {
    setSelectedOption((prevValue) => (prevValue === value ? null : value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setError("");

    if (!selectedOption) {
      setError("Please select an issue type.");
      return;
    }
    if (!description) {
      setError("Please fill out the reason");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(`/api/report/feedback/${id}`, {
        id,
        issue: selectedOption,
        reason: description,
      });
      if (response.status === 200) {
        setSuccessMessage("Report submitted successfully.");
        setSelectedOption(null);
        setDescription("");
      }
    } catch (error) {
      setError(
        "There was an error submitting the report. Please try again." + error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.reportFormOverlay} onClick={onClose}>
      <div className={styles.reportForm} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.heading}>Report Issue</h2>
        {error && <ValidationError message={error} />}
        {successMessage && <SuccessMessage message={successMessage} />}
        <form onSubmit={handleSubmit}>
          <div className={styles.checkboxGroup}>
            <label>
              <input
                type="checkbox"
                checked={selectedOption === "Spam"}
                onChange={() => handleCheckboxChange("Spam")}
              />
              Spam
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedOption === "Inappropriate Content"}
                onChange={() => handleCheckboxChange("Inappropriate Content")}
              />
              Inappropriate Content
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedOption === "Misinformation"}
                onChange={() => handleCheckboxChange("Misinformation")}
              />
              Misinformation
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedOption === "Other"}
                onChange={() => handleCheckboxChange("Other")}
              />
              Other
            </label>
          </div>
          <textarea
            className={styles.textarea}
            placeholder="Please describe the issue..."
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Report"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
