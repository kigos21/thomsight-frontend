import FormField from "../../form/FormField";
import StyledBox from "../../layout/StyledBox";
import Button from "../Button";
import styles from "./CompanyInterviewTipForm.module.scss";
import ValidationError from "../../form/ValidationError";

interface Tip {
  title: string;
  description: string;
}

interface CompanyInterviewTipFormProps {
  tip: Tip;
  onSave: () => void;
  onChange: (review: Tip) => void;
  onCancel: () => void;
  error: string;
  titleError: string;
  descriptionError: string;
}

const CompanyInterviewTipForm: React.FunctionComponent<
  CompanyInterviewTipFormProps
> = ({ tip, onSave, onChange, onCancel, titleError, descriptionError }) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange({ ...tip, [name]: value }); // Update review state based on input change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={`${styles.container}`}>
      <StyledBox paddedContainerClass={styles.styledBox}>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div>
            <p className={styles.formTitle}>Title</p>
            <FormField
              classNames={styles.formField}
              type="text"
              name="title"
              placeholder="Enter Tip Heading"
              required={true}
              value={tip.title}
              onChange={handleInputChange}
            ></FormField>
            {titleError && <ValidationError message={titleError} />}
          </div>

          <div>
            <p className={styles.formTitle}>Description</p>
            <FormField
              classNames={styles.formFieldBio}
              type="textarea"
              name="description"
              placeholder="Tip Description"
              required={true}
              value={tip.description}
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

export default CompanyInterviewTipForm;
