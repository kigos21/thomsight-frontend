import React, { useState } from "react";
import styles from "./EditLocationPopup.module.scss";
import { toast } from "react-toastify";
import FormField from "../../form/FormField";
import Button from "../Button";
import Spinner from "../Spinner";

interface EditLocationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: string) => Promise<void>;
  initialAddress?: string;
}

const EditLocationPopup: React.FC<EditLocationPopupProps> = ({
  isOpen,
  onClose,
  onSave,
  initialAddress,
}) => {
  const [address, setAddress] = useState(initialAddress || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (address && address.trim() === "") {
      toast.error("Location address cannot be blank.");
      return;
    }

    setLoading(true);
    try {
      await onSave(address);
      onClose();
    } catch (error) {
      toast.error("Failed to save location.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      {loading && <Spinner message="Updating location..." />}
      <div className={styles.popup}>
        <h2 className={styles.title}>Edit Location</h2>
        <div className={styles.separator}></div>
        <label className={styles.label}>Location Address</label>
        <FormField
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          classNames={styles.input}
          placeholder="Enter location"
          required
        />
        <div className={styles.buttonContainer}>
          <Button classNames={styles.cancelButton} onClick={onClose}>
            Cancel
          </Button>
          <Button
            classNames={styles.saveButton}
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

export default EditLocationPopup;
