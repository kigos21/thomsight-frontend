import FormField from "../../form/FormField";
import StyledBox from "../../layout/StyledBox";
import Button from "../Button";
import styles from "./CompanyReviewForm.module.scss";
import ValidationError from "../../form/ValidationError";

interface Review {
  rating: string;
  description: string;
}

interface CompanyReviewFormProps {
  review: Review;
  onSave: () => void;
  onChange: (review: Review) => void;
  onCancel: () => void;
  error: string;
  ratingError: string;
  descriptionError: string;
}

const CompanyReviewForm: React.FunctionComponent<CompanyReviewFormProps> = ({
  review,
  onSave,
  onChange,
  onCancel,
  ratingError,
  descriptionError,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange({ ...review, [name]: value }); // Update review state based on input change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  return (
    <div className={`${styles.container}`}>
      <StyledBox paddedContainerClass={styles.styledBox}>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div>
            <p className={styles.formTitle}>Rating</p>
            <FormField
              classNames={styles.formField}
              type="number"
              name="rating"
              placeholder="Rate your experience 1 to 5 (5 = highest)"
              required={true}
              value={review.rating}
              onChange={handleInputChange}
            ></FormField>
            {ratingError && <ValidationError message={ratingError} />}
          </div>

          <div>
            <p className={styles.formTitle}>Description</p>
            <FormField
              classNames={styles.formFieldBio}
              type="textarea"
              name="description"
              placeholder="Rating Description"
              required={true}
              value={review.description}
              onChange={handleInputChange}
            ></FormField>
            {descriptionError && <ValidationError message={descriptionError} />}
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
