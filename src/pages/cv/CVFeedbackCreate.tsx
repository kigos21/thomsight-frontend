import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import styles from "./CVFeedbackCreate.module.scss";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import Spinner from "../../components/ui/Spinner";

const CVFeedbackCreate = () => {
  const { cvId } = useParams<{ cvId: string }>();
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const response = await axiosInstance.get(`/api/cv/${cvId}/access`);
        setHasAccess(response.data.allowed);
      } catch (err) {
        console.error("Error checking access:", err);
        setHasAccess(false);
        navigate("/cv-review/to-review");
      }
    };

    checkAccess();
  }, [cvId, navigate]);

  if (hasAccess === null) {
    return <Spinner message="Checking access..." />;
  }

  return (
    <div className={styles.rootContainer}>
      <div className={styles.documentPlaceholder}>PDF Document</div>
      <h2 className={styles.remarksHeading}>Remarks</h2>

      <textarea
        name="comments"
        id="comments"
        rows={12}
        className={styles.textarea}
        placeholder="Comments"
      ></textarea>

      <Button color={"secondary"} roundness={"rounded"}>
        Submit
      </Button>
    </div>
  );
};

export default CVFeedbackCreate;
