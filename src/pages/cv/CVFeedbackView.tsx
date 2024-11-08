import { IconCircleFilled } from "@tabler/icons-react";

import styles from "./CVFeedbackView.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import Spinner from "../../components/ui/Spinner";

const CVFeedbackCreate = () => {
  const { reviewId } = useParams<{ reviewId: string }>();
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | undefined>("");
  const [remark, setRemark] = useState<string>("");
  const [remarkedBy, setRemarkedBy] = useState<string>("");
  const [loading, setLoading] = useState<string>("");

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const accessResponse = await axiosInstance.get(
          `/api/cv/${reviewId}/review/access`
        );
        setHasAccess(accessResponse.data.allowed);

        if (accessResponse.data.allowed) {
          setLoading("Getting details...");
          const response = await axiosInstance.get(
            `/api/cv/${reviewId}/review/pdf`
          );
          setPdfUrl(response.data.pdfUrl);
          setRemark(response.data.remark);
          setRemarkedBy(response.data.remarkedBy);
          console.log(pdfUrl);
        } else {
          navigate("/cv-review/reviewed");
        }
      } catch (err) {
        console.error("Error checking access or fetching PDF:", err);
        setHasAccess(false);
        navigate("/cv-review/reviewed");
      } finally {
        setLoading("");
      }
    };

    checkAccess();
  }, [reviewId, navigate]);

  if (hasAccess === null) {
    return <Spinner message="Checking access..." />;
  }

  if (!hasAccess) {
    return <div>You don't have permission to view this CV.</div>;
  }

  return (
    <div className={styles.rootContainer}>
      {loading && <Spinner message={loading} />}
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

      <p className={styles.plink}>
        If you cannot view the PDF file, you can open or download it from here:
        <a
          className={styles.dlPdf}
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.downloadText}>View PDF</span>
        </a>
      </p>

      <div className={styles.headingGroup}>
        <h2>Remarks</h2>
        <IconCircleFilled size={4} className={styles.separator} />
        <span>by {remarkedBy}</span>
      </div>

      <p>{remark} </p>
    </div>
  );
};

export default CVFeedbackCreate;
