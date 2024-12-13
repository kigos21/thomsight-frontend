import React, { useEffect, useState } from "react";
import styles from "./EditCompanyInfoPopup.module.scss";
import FormField from "../../form/FormField";
import Button from "../../ui/Button";
import { toast } from "react-toastify";
import Spinner from "../../ui/Spinner";

interface EditCompanyInfoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    size: string;
    industry: string;
    description: string;
  }) => Promise<void>;
  initialSize?: string;
  initialIndustry?: string;
  initialDescription?: string;
}

const EditCompanyInfoPopup: React.FC<EditCompanyInfoPopupProps> = ({
  isOpen,
  onClose,
  onSave,
  initialSize = "",
  initialIndustry = "",
  initialDescription = "",
}) => {
  const [size, setSize] = useState(initialSize);
  const [industry, setIndustry] = useState(initialIndustry);
  const [description, setDescription] = useState(initialDescription);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSize(initialSize);
      setIndustry(initialIndustry);
      setDescription(initialDescription);
    }
  }, [isOpen, initialSize, initialIndustry, initialDescription]);

  const handleSave = async () => {
    const sizeTrimmed = size.trim();
    const industryTrimmed = industry.trim();
    const descriptionTrimmed = description.trim();

    if (sizeTrimmed === "") {
      toast.error("Company size cannot be blank");
      return;
    }

    if (industryTrimmed === "") {
      toast.error("Industry cannot be blank");
      return;
    }

    if (descriptionTrimmed === "") {
      toast.error("Company description cannot be blank");
      return;
    }

    if (descriptionTrimmed.length > 2500) {
      toast.error("Description should not exceed more than 2500 characters");
      return;
    }

    if (sizeTrimmed.length > 100) {
      toast.error("Size should not exceed more than 100 characters");
      return;
    }

    if (industryTrimmed.length > 100) {
      toast.error("Industry should not exceed more than 100 characters");
      return;
    }

    try {
      setLoading(true);
      await onSave({
        size: sizeTrimmed,
        industry: industryTrimmed,
        description: descriptionTrimmed,
      });
      onClose();
    } catch (error) {
      toast.error("Failed to save company information");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2 className={styles.title}>Company Information</h2>
        <div className={styles.separator}></div>
        {loading ? (
          <Spinner message="Saving..." />
        ) : (
          <div className={styles.formContainer}>
            <div>
              <label className={styles.label}>Company Size</label>
              <FormField
                classNames={styles.formField}
                type="text"
                placeholder="Company Size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                required
              />
            </div>
            <div>
              <label className={styles.label}>Industry</label>
              <FormField
                classNames={styles.formField}
                type="text"
                placeholder="Industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                required
              />
            </div>
            <div>
              <label className={styles.label}>Company Description</label>
              <FormField
                classNames={styles.textarea}
                type="textarea"
                placeholder="Company Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>
        )}
        <div className={styles.buttonContainer}>
          <Button
            color="black"
            classNames={styles.cancelButton}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            classNames={styles.saveButton}
            color="secondary"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditCompanyInfoPopup;
