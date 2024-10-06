import StyledBox from "../../layout/StyledBox";
import Button from "../Button";
import FormField from "../../form/FormField";

import styles from "./CompanyJobInformationFormItem.module.scss";

interface CompanyJobInformationFormItemProps {
  jobTitle: string;
  jobDescription: string;
}

export default function CompanyJobInformationFormItem({
  jobTitle,
  jobDescription,
}: CompanyJobInformationFormItemProps) {
  return (
    <div className={`${styles.container}`}>
      <StyledBox paddedContainerClass={styles.styledBox}>
        <div className={styles.formContainer}>
          <div>
            <p className={styles.formTitle}>Job Title</p>
            <FormField
              classNames={styles.formField}
              type="text"
              placeholder="Enter Job Title"
              required={true}
              value={jobTitle}
            ></FormField>
          </div>

          <div>
            <p className={styles.formTitle}>Job Description</p>
            <FormField
              classNames={styles.formFieldBio}
              type="textarea"
              placeholder="Enter Job Description"
              required={true}
              value={jobDescription}
            ></FormField>
          </div>

          <Button
            color="primary"
            roundness="rounded"
            classNames={styles.button}
          >
            Submit
          </Button>
        </div>
      </StyledBox>
    </div>
  );
}
