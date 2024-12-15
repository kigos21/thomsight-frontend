import React, { useEffect, useState } from "react";
import styles from "./EditTipPopup.module.scss";
import Button from "./Button";
import axiosInstance from "../../services/axiosInstance";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

interface Field {
  id: number;
  header: string;
  description: string;
}

interface EditTipPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditTipPopup: React.FC<EditTipPopupProps> = ({ isOpen, onClose }) => {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState<string>("");
  const [existingTips, setExistingTips] = useState<Field[]>([]);

  useEffect(() => {
    const fetchTips = async () => {
      if (!isOpen) return;

      setLoading("Loading tips...");
      try {
        const response = await axiosInstance.get("/api/guide-tips");
        const fetchedTips = response.data.map((tip: any) => ({
          id: tip.id,
          header: tip.header,
          description: tip.details,
        }));
        setExistingTips(fetchedTips);
        setFields(fetchedTips);
      } catch (error) {
        toast.error("Error fetching tips. Please try again later.");
        console.error("Error fetching tips:", error);
      } finally {
        setLoading("");
      }
    };

    fetchTips();
  }, [isOpen]);

  const handleFieldChange = (id: number, field: keyof Field, value: string) => {
    setFields((prevFields) =>
      prevFields.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    );
  };

  const addField = () => {
    setFields((prevFields) => [
      ...prevFields,
      { id: Date.now(), header: "", description: "" },
    ]);
  };

  const removeField = (id: number) => {
    setFields((prevFields) => prevFields.filter((field) => field.id !== id));
  };

  const handleSubmit = async () => {
    setLoading("Updating tips...");
    try {
      const newTips = fields.filter(
        (field) => !existingTips.find((tip) => tip.id === field.id)
      );
      const updatedTips = fields.filter((field) =>
        existingTips.find(
          (tip) =>
            tip.id === field.id &&
            (tip.header !== field.header ||
              tip.description !== field.description)
        )
      );
      const deletedTips = existingTips.filter(
        (tip) => !fields.find((field) => field.id === tip.id)
      );

      const payload = {
        newTips,
        updatedTips,
        deletedTips,
      };

      await axiosInstance.post("/api/guide-tips/store", payload);

      toast.success("Updated tips successfully");
      setFields([]);
      onClose();
    } catch (error) {
      toast.error("Error saving tips. Please try again later.");
      console.error("Error saving tips:", error);
    } finally {
      setLoading("");
    }
  };

  const handleClose = () => {
    setFields(existingTips);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      {loading && <Spinner message={loading} />}
      <div className={styles.popup}>
        <h2 className={styles.title}>Edit Interview Tips</h2>
        <div className={styles.separator}></div>
        <div className={styles.formContainer}>
          {fields.map((field) => (
            <div key={field.id} className={styles.fieldGroup}>
              <label className={styles.label}>Tip Header</label>
              <input
                className={styles.input}
                type="text"
                placeholder="Input tip header"
                value={field.header}
                onChange={(e) =>
                  handleFieldChange(field.id, "header", e.target.value)
                }
              />
              <label className={styles.label}>Tip Details</label>
              <textarea
                className={styles.textarea}
                placeholder="Input interview tips"
                value={field.description}
                onChange={(e) =>
                  handleFieldChange(field.id, "description", e.target.value)
                }
              />
              {fields.length > 1 && (
                <Button
                  classNames={styles.removeButton}
                  onClick={() => removeField(field.id)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button classNames={styles.addButton} onClick={addField}>
            Add Tip
          </Button>
        </div>
        <div className={styles.buttonContainer}>
          <Button classNames={styles.cancelButton} onClick={handleClose}>
            Cancel
          </Button>
          <Button classNames={styles.submitButton} onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditTipPopup;
