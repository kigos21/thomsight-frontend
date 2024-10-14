import { useState } from "react";
import FormField from "../../form/FormField";
import SuccessMessage from "../../form/SuccessMessage";
import StyledBox from "../../layout/StyledBox";
import Button from "../Button";
import Spinner from "../Spinner";
import styles from "./CompanyReviewForm.module.scss";

interface Review {
  rating: string;
  description: string;
}

interface CompanyReviewFormProps {
  review: Review;
  onSave: () => void;
  onChange: (review: Review) => void;
  onCancel: () => void;
}

const CompanyReviewForm: React.FunctionComponent<CompanyReviewFormProps> = ({
  review,
  onSave,
  onChange,
  onCancel,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange({ ...review, [name]: value }); // Update review state based on input change
  };

  // const { slug } = useParams<{ slug: string }>();
  const [reviewRating, setReviewRating] = useState("");
  const [reviewDescription, setReviewDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<boolean>(false);
  // const { getCompanyBySlug, updateCompany, createJob } = useCompanies();
  // const company = getCompanyBySlug(slug || "");
  const [creating, setCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={`${styles.container}`}>
      {creating && <Spinner message="Creating job..." />}
      {success && <SuccessMessage message="Created job successfully" />}
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
          </div>

          <div className={styles.buttonGroup}>
            <Button
              color="secondary"
              roundness="rounded"
              classNames={styles.button}
              onClick={onCancel}
              style={{ backgroundColor: "var(--neutral-2)" }}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              roundness="rounded"
              classNames={styles.button}
              onClick={onSave}
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
