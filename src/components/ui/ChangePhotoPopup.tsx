import React from "react";
import styles from "./ChangePhotoPopup.module.scss";

interface ChangePhotoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (file: File | null) => void;
}

const ChangePhotoPopup: React.FC<ChangePhotoPopupProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSave = () => {
    onSave(selectedFile);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2 className={styles.title}>Change Photo</h2>
        <div className={styles.chooseImageContainer}>
          <label htmlFor="fileInput">Choose an Image:</label>
          <input id="fileInput" type="file" onChange={handleFileChange} />
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.redButton} onClick={onClose}>Cancel</button>
          <button className={styles.popupButton} onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ChangePhotoPopup; 