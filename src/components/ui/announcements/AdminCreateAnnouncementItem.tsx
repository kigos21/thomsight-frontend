import { AdminCreatennouncementItemProps } from "../../../types/props";
import PaddedContainer from "../../layout/PaddedContainer";
import Button from "../Button";
import FormField from "../../form/FormField";
import { createAnnouncement } from "../../../api/adminCRUD";
import { useState } from "react";

import styles from "./AdminCreateAnnouncementItem.module.scss";
import Spinner from "../Spinner";
import ValidationError from "../../form/ValidationError";
import SuccessMessage from "../../form/SuccessMessage";

export default function AdminCreatennouncementItem({
  classNames,
  style,
}: AdminCreatennouncementItemProps) {
  const [subject, setSubject] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const [subjectError, setSubjectError] = useState<string>("");
  const [detailsError, setDetailsError] = useState<string>("");

  const handleSubmit = async () => {
    setLoading(true);
    setSuccessMessage("");
    setSubjectError("");
    setDetailsError("");
    let isValid = true;

    if (subject.trim() === "") {
      setSubjectError("Subject cannot be blank");
      isValid = false;
    }
    if (details.trim() === "") {
      setDetailsError("Details cannot be blank");
      isValid = false;
    }

    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      await createAnnouncement(subject, details);
      setSubject("");
      setDetails("");
      setSuccessMessage("Announcement created successfully!");
    } catch (error) {
      console.error("Error creating announcement:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      <div className={`${styles.container} ${classNames}`} style={style}>
        <div className={styles.titleContainer}>
          <h2>Create Announcement</h2>
          {loading && <Spinner message="Creating..." />}
          <Button
            classNames={styles.submitButton}
            color="secondary"
            roundness="rounded"
            onClick={handleSubmit}
            disabled={loading}
          >
            Submit
          </Button>
        </div>
        {successMessage && <SuccessMessage message={successMessage} />}{" "}
        <div className={styles.formContainer}>
          <div>
            <FormField
              classNames={styles.formField}
              type="text"
              placeholder="Subject"
              required={true}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            {subjectError && <ValidationError message={subjectError} />}
          </div>

          <div>
            <FormField
              classNames={styles.formFieldBio}
              type="textarea"
              placeholder="Announcement Details"
              required={true}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            {subjectError && <ValidationError message={detailsError} />}
          </div>
        </div>
      </div>
    </PaddedContainer>
  );
}
