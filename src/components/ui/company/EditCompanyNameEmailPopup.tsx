import React, { useState } from "react";
import styles from "./EditCompanyNameEmailPopup.module.scss";
import { toast } from "react-toastify";
import Button from "../../ui/Button";

interface EditCompanyNameEmailPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, email: string) => Promise<void>;
  initialName: string;
  initialEmail: string;
}

const EditCompanyNameEmailPopup: React.FC<EditCompanyNameEmailPopupProps> = ({
  isOpen,
  onClose,
  onSave,
  initialName,
  initialEmail,
}) => {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    const nameTrimmed = name.trim();
    const emailTrimmed = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nameTrimmed === "") {
      toast.error("Company name cannot be blank");
      return;
    }

    if (emailTrimmed === "") {
      toast.error("Email cannot be blank");
      return;
    }

    if (!emailPattern.test(emailTrimmed)) {
      toast.error("Invalid email format");
      return;
    }

    try {
      setLoading(true);
      await onSave(nameTrimmed, emailTrimmed);
      onClose();
    } catch (error) {
      toast.error("Failed to save company name and email");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2 className={styles.title}>Company Name & Email</h2>
        <div className={styles.separator}></div>
        <label className={styles.label}>Company Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
        <label className={styles.label}>Company Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <div className={styles.buttonContainer}>
          <Button classNames={styles.cancelButton} onClick={onClose}>
            Cancel
          </Button>
          <Button classNames={styles.saveButton} onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditCompanyNameEmailPopup; 