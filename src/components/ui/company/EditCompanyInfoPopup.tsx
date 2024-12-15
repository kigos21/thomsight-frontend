import React, { useEffect, useRef, useState } from "react";
import styles from "./EditCompanyInfoPopup.module.scss";
import FormField from "../../form/FormField";
import Button from "../../ui/Button";
import { toast } from "react-toastify";
import Spinner from "../../ui/Spinner";
import Quill from "quill";

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

  const quillRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSize(initialSize);
      setIndustry(initialIndustry);
      setDescription(initialDescription);
    }
  }, [isOpen, initialSize, initialIndustry, initialDescription]);

  useEffect(() => {
    if (isOpen && quillRef.current) {
      if (quillInstance.current) {
        quillInstance.current.off("text-change");
        quillInstance.current = null;
      }

      quillInstance.current = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
          ],
        },
      });

      quillInstance.current.root.innerHTML = initialDescription;

      quillInstance.current.on("text-change", () => {
        const htmlContent = quillInstance.current?.root.innerHTML || "";
        setDescription(htmlContent);
      });
    }

    return () => {
      if (quillInstance.current) {
        quillInstance.current.off("text-change");
        quillInstance.current = null;
      }
    };
  }, [isOpen, initialDescription]);

  const handleSave = async () => {
    const sizeTrimmed = size.trim();
    const industryTrimmed = industry.trim();
    const plainTextDescription =
      new DOMParser()
        .parseFromString(description, "text/html")
        .body.textContent?.trim() || "";

    if (sizeTrimmed === "") {
      toast.error("Company size cannot be blank");
      return;
    }

    if (industryTrimmed === "") {
      toast.error("Industry cannot be blank");
      return;
    }

    if (plainTextDescription === "") {
      toast.error("Company description cannot be blank");
      return;
    }

    if (plainTextDescription.length > 2500) {
      toast.error("Description should not exceed more than 2500 characters");
      return;
    }

    if (sizeTrimmed.length > 56) {
      toast.error("Size should not exceed more than 56 characters");
      return;
    }

    if (industryTrimmed.length > 56) {
      toast.error("Industry should not exceed more than 56 characters");
      return;
    }

    try {
      setLoading(true);
      await onSave({
        size: size,
        industry: industry,
        description: description,
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
              <div className={styles.quillWrapper}>
                <div ref={quillRef} className={styles.quillContainer}></div>
              </div>
              {/* <FormField
                classNames={styles.textarea}
                type="textarea"
                placeholder="Company Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              /> */}
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
