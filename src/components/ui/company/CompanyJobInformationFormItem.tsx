import StyledBox from "../../layout/StyledBox";
import Button from "../Button";
import FormField from "../../form/FormField";

import styles from "./CompanyJobInformationFormItem.module.scss";
import { Job } from "../../../types/types";

interface CompanyJobInformationFormItemProps {
  job: Job;
  onSave: () => void;
  onChange: (job: Job) => void;
  onCancel: () => void;
}

export default function CompanyJobInformationFormItem({
  job,
  onSave,
  onChange,
  onCancel,
}: CompanyJobInformationFormItemProps) {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange({ ...job, [name]: value }); // Update job state based on input change
  };

  return (
    <div className={`${styles.container}`}>
      <StyledBox paddedContainerClass={styles.styledBox}>
        <div className={styles.formContainer}>
          <div>
            <p className={styles.formTitle}>Job Title</p>
            <FormField
              classNames={styles.formField}
              type="text"
              name="title"
              placeholder="Enter Job Title"
              required={true}
              value={job.title}
              onChange={handleInputChange}
            ></FormField>
          </div>

          <div>
            <p className={styles.formTitle}>Job Description</p>
            <FormField
              classNames={styles.formFieldBio}
              type="textarea"
              name="description"
              placeholder="Enter Job Description"
              required={true}
              value={job.description}
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
        </div>
      </StyledBox>
    </div>
  );
}
