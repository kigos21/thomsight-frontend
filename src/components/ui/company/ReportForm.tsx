import React from "react";
import styles from "./ReportForm.module.scss";
import { ReportFormProps } from "../../../types/props";

const ReportForm: React.FC<ReportFormProps> = ({
  isVisible,
  onClose,
  selectedOption,
  setSelectedOption,
  description,
  setDescription,
  handleSubmit,
  loading,
}) => {
  if (!isVisible) return null;

  const handleCheckboxChange = (value: string) => {
    setSelectedOption(value === selectedOption ? "" : value);
  };

  return (
    <div className={styles.reportFormOverlay} onClick={onClose}>
      <div className={styles.reportForm} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.heading}>Report Issue</h2>
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
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>

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
