import { CompanyJobInformationFormItemProps } from "../../types/props";
import PaddedContainer from "../layout/PaddedContainer";
import StyledBox from "../layout/StyledBox";
import Button from "./Button";
import FormField from "../form/FormField";

import styles from "./CompanyJobInformationFormItem.module.scss";

export default function CompanyJobInformationFormItem({
  classNames,
  style,
  jobTitle,
  tags,
  jobDescription,
}: CompanyJobInformationFormItemProps) {
  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      <div className={`${styles.container} ${classNames}`} style={style}>
        <div className={styles.titleContainer}>
          <h2>Company Location</h2>
          <Button
            classNames={styles.addJobButton}
            color="secondary"
            roundness="rounded"
          >
            Add Job
          </Button>
        </div>

        <StyledBox paddedContainerClass={styles.styledBox}>
          <div className={styles.formContainer}>
            <div>
              <p className={styles.formTitle}>Job Title</p>
              <FormField
                classNames={styles.formField}
                type="text"
                placeholder="Enter Job Title"
                required={true}
              ></FormField>
            </div>

            <div>
              <p className={styles.formTitle}>Tags</p>
              <FormField
                classNames={styles.formField}
                type="text"
                placeholder="Enter Tags"
                required={true}
              ></FormField>
            </div>

            <div>
              <p className={styles.formTitle}>Job Description</p>
              <FormField
                classNames={styles.formFieldBio}
                type="textarea"
                placeholder="Enter Job Description"
                required={true}
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
    </PaddedContainer>
  );
}
