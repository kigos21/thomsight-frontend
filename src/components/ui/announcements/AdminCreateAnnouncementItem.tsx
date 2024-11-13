import { AdminCreatennouncementItemProps } from "../../../types/props";
import PaddedContainer from "../../layout/PaddedContainer";
import Button from "../Button";
import FormField from "../../form/FormField";
import { createAnnouncement } from "../../../api/adminCRUD";
import { useState } from "react";

import styles from "./AdminCreateAnnouncementItem.module.scss";
import Spinner from "../Spinner";
import { containsBadWords } from "../../../badWordsFilter";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AdminCreatennouncementItem({
  classNames,
  style,
}: AdminCreatennouncementItemProps) {
  const [subject, setSubject] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async () => {
    if (subject.trim() === "") {
      toast.error("Subject cannot be blank");
      return;
    }
    if (details.trim() === "") {
      toast.error("Details cannot be blank");
      return;
    }
    if (containsBadWords(subject)) {
      toast.error("Subject contains foul language");
      return;
    }
    if (containsBadWords(details)) {
      toast.error("Details contains foul language");
      return;
    }
    if (subject.length > 100) {
      toast.error("Subject should be limited to 100 characters");
      return;
    }
    if (details.length > 500) {
      toast.error("Details should be limited to 500 characters");
      return;
    }

    try {
      setLoading(true);
      await createAnnouncement(subject, details);
      setSubject("");
      setDetails("");
      toast.success("Announcement created successfully!");
      navigate("/announcements");
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
          </div>
        </div>
      </div>
    </PaddedContainer>
  );
}
