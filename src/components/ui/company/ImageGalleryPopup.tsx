import React, { useState } from "react";
import styles from "./ImageGalleryPopup.module.scss";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import axiosInstance from "../../../services/axiosInstance";
import { useImages } from "../../../contexts/GalleryContext";

interface ImageGalleryPopupProps {
  onClose: () => void;
}

const ImageGalleryPopup: React.FC<ImageGalleryPopupProps> = ({ onClose }) => {
  const { slug } = useParams<{ slug: string }>();
  const [imageInputs, setImageInputs] = useState<File[]>([new File([], "")]);
  const [loading, setLoading] = useState<string>("");
  const { images, handleImageUpload } = useImages();

  const handleAddInput = () => {
    if (imageInputs.length < 5) {
      setImageInputs([...imageInputs, new File([], "")]);
    }
  };

  const handleRemoveInput = (index: number) => {
    const updatedInputs = imageInputs.filter((_, i) => i !== index);
    setImageInputs(updatedInputs);
  };

  const handleFileChange = (index: number, file: File | null) => {
    const updatedInputs = [...imageInputs];
    if (file) {
      updatedInputs[index] = file;
    }
    setImageInputs(updatedInputs);
  };

  const handleSave = async () => {
    const formData = new FormData();
    imageInputs.forEach((file) => {
      if (file) {
        formData.append("images[]", file);
      }
    });
    formData.append("slug", slug ?? "");

    setLoading("Uploading image/s...");
    try {
      const response = await axiosInstance.post(
        "/api/company/images",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Uploaded images successfully");
        const uploadedImages = response.data.images || [];
        uploadedImages.forEach((image: string) => {
          handleImageUpload(image);
        });
        onClose();
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error("Error saving images:", error);
    } finally {
      setLoading("");
    }
  };

  return (
    <div className={styles.overlay}>
      {loading && <Spinner message={loading} />}
      <div className={styles.popup}>
        <h2 className={styles.title}>Manage Image Gallery</h2>
        <div className={styles.imageInputContainer}>
          {imageInputs.map((input, index) => (
            <div key={index} className={styles.imageInputRow}>
              <label
                className={styles.chooseImageLabel}
                htmlFor={`fileInput${index}`}
              >
                Image {index + 1}:
              </label>
              <input
                id={`fileInput${index}`}
                type="file"
                accept=".jpeg, .jpg, .png"
                className={styles.fileInput}
                onChange={(e) =>
                  handleFileChange(
                    index,
                    e.target.files ? e.target.files[0] : null
                  )
                }
              />
              {index > 0 && (
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveInput(index)}
                >
                  ✖
                </button>
              )}
            </div>
          ))}
        </div>
        {imageInputs.length < 5 && (
          <button className={styles.addButton} onClick={handleAddInput}>
            + Add Another Image
          </button>
        )}
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

export default ImageGalleryPopup;
