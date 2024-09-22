import { AdminCreatennouncementItemProps } from "../../../types/props";
import PaddedContainer from "../../layout/PaddedContainer";
import Button from "../Button";
import FormField from "../../form/FormField";

import styles from "./AdminCreateAnnouncementItem.module.scss";

export default function AdminCreatennouncementItem({
  classNames,
  style,
  subject,
  details,
}: AdminCreatennouncementItemProps) {
  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      <div className={`${styles.container} ${classNames}`} style={style}>
        <div className={styles.titleContainer}>
          <h2>Create Announcement</h2>
          <Button
            classNames={styles.submitButton}
            color="secondary"
            roundness="rounded"
          >
            Submit
          </Button>
        </div>

        <div className={styles.formContainer}>
          <div>
            <FormField
              classNames={styles.formField}
              type="text"
              placeholder="Subject"
              required={true}
              value={subject}
            />
          </div>

          <div>
            <FormField
              classNames={styles.formFieldBio}
              type="textarea"
              placeholder="Announcement Details"
              required={true}
              value={details}
            />
          </div>
        </div>
      </div>
    </PaddedContainer>
  );
}
