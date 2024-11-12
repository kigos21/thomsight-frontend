import React, { useState } from "react";
import styles from "./ChangePhotoPopup.module.scss";
import axiosInstance from "../../services/axiosInstance";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { useCompanies } from "../../contexts/CompaniesContext";
import { toast } from "react-toastify";

interface ChangePhotoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (file: File | null) => void;
}

const ChangePhotoPopup: React.FC<ChangePhotoPopupProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState<string>("");
  const { updateCompany, getCompanyBySlug } = useCompanies();
  const company = getCompanyBySlug(slug as string);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("photo", selectedFile);

    try {
      setLoading("Updating photo...");
      const response = await axiosInstance.post(
        `/api/company/${slug}/update-photo`,
        formData
      );
      const updatedCompany = {
        ...company,
        image: response.data.photo,
      };
      toast.success("Successfully changed photo");
      updateCompany(updatedCompany);
    } catch (error) {
      console.error(error);
    } finally {
      onClose();
      setLoading("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      {loading && <Spinner message={loading} />}
      <div className={styles.popup}>
        <h2 className={styles.title}>Change Photo</h2>
        <div className={styles.chooseImageContainer}>
          <label htmlFor="fileInput">Choose an Image:</label>
          <input
            id="fileInput"
            type="file"
            accept=".jpeg, .jpg, .png"
            onChange={handleFileChange}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.redButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.popupButton} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePhotoPopup;
