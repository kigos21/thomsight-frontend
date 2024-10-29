import React from "react";
import styles from "./ReportForm.module.scss";
import { ReportFormProps } from "../../../types/props";

const ReportForm: React.FC<ReportFormProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className={styles.reportFormOverlay} onClick={onClose}>
      <div className={styles.reportForm} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.heading}>Report Issue</h2>
        <form>
          <div className={styles.checkboxGroup}>
            <label>
              <input type="checkbox" name="reportType" value="spam" />
              Spam
            </label>
            <label>
              <input type="checkbox" name="reportType" value="inappropriate" />
              Inappropriate Content
            </label>
            <label>
              <input type="checkbox" name="reportType" value="misinformation" />
              Misinformation
            </label>
            <label>
              <input type="checkbox" name="reportType" value="other" />
              Other
            </label>
          </div>
          <textarea
            className={styles.textarea}
            placeholder="Please describe the issue..."
            rows={4}
          ></textarea>
          <button type="submit" className={styles.submitButton}>
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
