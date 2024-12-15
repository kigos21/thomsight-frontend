import React, { useState, useEffect } from "react";
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
  const defaultImage = new File([""], "default.jpg", { type: "image/jpeg" });
  const { slug } = useParams<{ slug: string }>();
  const [imageInputs, setImageInputs] = useState<File[]>([defaultImage]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<string>("");
  const { handleImageUpload, removeImages } = useImages();

  useEffect(() => {
    if (!slug) return;

    const fetchImages = async () => {
      setLoading("Fetching images...");
      try {
        const response = await axiosInstance.get(`/api/company/${slug}/images`);
        const images = response.data.images || [];
        setExistingImages(images);
        if (images.length === 5) {
          setImageInputs([]);
        }
      } catch (error) {
        console.error("Error fetching existing images:", error);
        toast.error("Failed to fetch existing images.");
      } finally {
        setLoading("");
      }
    };

    fetchImages();
  }, [slug, handleImageUpload]);

  const handleAddInput = () => {
    if (imageInputs.length + existingImages.length < 5) {
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

  const handleRemoveExistingImage = (image: string) => {
    setExistingImages(existingImages.filter((img) => img !== image));
    setDeletedImages((prevDeletedImages) => [...prevDeletedImages, image]);
  };

  const handleSave = async () => {
    const formData = new FormData();

    imageInputs.forEach((file) => {
      if (file) {
        formData.append("images[]", file);
      }
    });

    existingImages.forEach((image) => {
      formData.append("existing_images[]", image);
    });

    deletedImages.forEach((image) => {
      formData.append("deleted_images[]", image);
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
        removeImages();
        uploadedImages.forEach((image: string) => {
          handleImageUpload(image);
        });
        onClose();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error saving images.");
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
        <div className={styles.separator}></div>
        <div className={styles.imageListContainer}>
          {/* Existing images list */}
          {existingImages.length > 0 && (
            <div className={styles.existingImages}>
              <h3>Existing Images</h3>
              {existingImages.map((image, index) => {
                const basename = image.substring(image.lastIndexOf("/") + 1);

                return (
                  <div key={index} className={styles.existingImageRow}>
                    <span className={styles.existingImageName}>{basename}</span>
                    <button
                      className={styles.removeButton}
                      onClick={() => handleRemoveExistingImage(image)}
                    >
                      ✖
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* New image inputs */}
          <div className={styles.imageInputContainer}>
            {imageInputs.map((input, index) => (
              <div key={index} className={styles.imageInputRow}>
                <label
                  className={styles.chooseImageLabel}
                  htmlFor={`fileInput${index}`}
                >
                  Image {existingImages.length + index + 1}:
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

          {/* Add new input button */}
          {imageInputs.length + existingImages.length < 5 && (
            <button className={styles.addButton} onClick={handleAddInput}>
              + Add Another Image
            </button>
          )}
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.saveButton} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageGalleryPopup;
