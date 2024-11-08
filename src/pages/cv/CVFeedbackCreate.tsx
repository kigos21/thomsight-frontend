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
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const accessResponse = await axiosInstance.get(
          `/api/cv/${cvId}/access`
        );
        setHasAccess(accessResponse.data.allowed);

        if (accessResponse.data.allowed) {
          const pdfResponse = await axiosInstance.get(`/api/cv/${cvId}/pdf`);
          setPdfUrl(pdfResponse.data.pdfUrl);
        } else {
          navigate("/cv-review/to-review");
        }
      } catch (err) {
        console.error("Error checking access or fetching PDF:", err);
        setHasAccess(false);
        navigate("/cv-review/to-review");
      }
    };

    checkAccess();
  }, [cvId, navigate]);

  if (hasAccess === null) {
    return <Spinner message="Checking access..." />;
  }

  if (!hasAccess) {
    return <div>You don't have permission to view this CV.</div>;
  }

  return (
    <div className={styles.rootContainer}>
      {pdfUrl ? (
        <div className={styles.documentPlaceholder}>
          <embed
            src={pdfUrl}
            type="application/pdf"
            width="100%"
            height="600px"
          />
        </div>
      ) : (
        <div>Loading PDF...</div>
      )}

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
