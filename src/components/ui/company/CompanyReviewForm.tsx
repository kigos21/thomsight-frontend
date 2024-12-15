import React, { useRef, useEffect, useState } from "react";
// import FormField from "../../form/FormField";
import StarRating from "../../layout/StarRating";
import StyledBox from "../../layout/StyledBox";
import Button from "../Button";
import styles from "./CompanyReviewForm.module.scss";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface Review {
  rating: string;
  description: string;
  image?: File | null;
}

interface CompanyReviewFormProps {
  review: Review;
  onSave: () => void;
  onChange: (review: Review) => void;
  onCancel: () => void;
  setSelectedFile: (file: File | null) => void;
}

const CompanyReviewForm: React.FunctionComponent<CompanyReviewFormProps> = ({
  review,
  onSave,
  onChange,
  onCancel,
  setSelectedFile,
}) => {
  const [rating, setRating] = useState(review.rating);
  const [description, setDescription] = useState(review.description);

  const quillRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);

  useEffect(() => {
    if (!quillRef.current || quillInstance.current) return;

    quillInstance.current = new Quill(quillRef.current, {
      theme: "snow",
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }],
        ],
      },
    });

    quillInstance.current.root.innerHTML = description;

    quillInstance.current.on("text-change", () => {
      const htmlContent = quillInstance.current?.root.innerHTML || "";
      setDescription(htmlContent);
      onChange({ rating, description: htmlContent });
    });
  }, [description, rating, onChange]);

  useEffect(() => {
    onChange({ rating, description });
  }, [rating, description, onChange]);

  // const handleInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   if (name === "description") {
  //     setDescription(value);
  //   } else if (name === "rating") {
  //     setRating(value);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onChange({ rating, description, image: review.image });
    onSave();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      onChange({ rating, description, image: e.target.files[0] });
    }
  };

  return (
    <div className={`${styles.container}`}>
      <StyledBox paddedContainerClass={styles.styledBox}>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div>
            <p className={styles.formTitle}>Rating</p>
            {/* <FormField
              classNames={styles.formField}
              type="number"
              name="rating"
              placeholder="Rate your experience 1 to 5 (5 = highest)"
              required={true}
              value={rating}
              onChange={handleInputChange}
            ></FormField> */}
            <StarRating
              rating={rating}
              onRate={(newRating: string) => {
                setRating(newRating);
                onChange({ rating: newRating, description });
              }}
            ></StarRating>
          </div>

          <div>
            <p className={styles.formTitle}>Description</p>
            <div className={styles.quillWrapper}>
              <div ref={quillRef} className={styles.quillContainer}></div>
            </div>
          </div>

          <div>
            <p className={styles.formTitle}>
              Image Upload (optional, max 4 MB)
            </p>
            <input
              id="fileInput"
              type="file"
              accept=".jpeg, .jpg, .png"
              onChange={handleFileChange}
            />
          </div>

          <div className={styles.buttonGroup}>
            <Button
              color="gray"
              roundness="rounded"
              classNames={styles.buttonCancel}
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              roundness="rounded"
              classNames={styles.buttonSubmit}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </StyledBox>
    </div>
  );
};

export default CompanyReviewForm;
