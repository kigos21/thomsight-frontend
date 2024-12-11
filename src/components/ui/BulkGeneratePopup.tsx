import { useState } from "react";
import styles from "./BulkGeneratePopup.module.scss";
import { toast } from "react-toastify";
import Button from "./Button";
import axiosInstance from "../../services/axiosInstance";
import Spinner from "./Spinner";

interface BulkGeneratePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onBulkGenerateSuccess: (newTokens: any[]) => void;
}

const BulkGeneratePopup: React.FC<BulkGeneratePopupProps> = ({
  isOpen,
  onClose,
  onBulkGenerateSuccess,
}) => {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setCsvFile(file);
  };

  const handleBulkGenerate = async () => {
    if (!csvFile) {
      toast.error("Please upload a CSV file.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("csv_file", csvFile);

      const response = await axiosInstance.post(
        "/api/tokens/bulk-generate",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        const newTokens = response.data.tokens;
        onBulkGenerateSuccess(newTokens);
        onClose();
      } else {
        toast.error(response.data.message || "Failed to generate tokens.");
      }
    } catch (error) {
      console.error("Error generating bulk tokens:", error);
      toast.error("Error generating bulk tokens.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      {loading && <Spinner message="Generating bulk tokens..." />}
      <div className={styles.popup}>
        <h2 className={styles.title}>Bulk Generate</h2>
        <div className={styles.chooseImageContainer}>
          <label htmlFor="fileInput" className={styles.fileLabel}>
            Please upload a CSV list of emails:
          </label>
          <input
            id="fileInput"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button
            classNames={styles.cancelButton}
            color={"black"}
            roundness={"sm-rounded"}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            classNames={styles.saveButton}
            color={"secondary"}
            roundness={"sm-rounded"}
            onClick={handleBulkGenerate}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkGeneratePopup;
