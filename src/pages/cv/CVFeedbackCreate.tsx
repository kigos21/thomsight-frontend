import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import styles from "./CVFeedbackCreate.module.scss";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import Spinner from "../../components/ui/Spinner";
import { toast } from "react-toastify";

const CVFeedbackCreate = () => {
  const { cvId } = useParams<{ cvId: string }>();
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | undefined>("");
  const [remark, setRemark] = useState<string>("");
  const [loading, setLoading] = useState<string>("");

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const accessResponse = await axiosInstance.get(
          `/api/cv/${cvId}/access`
        );
        setHasAccess(accessResponse.data.allowed);

        if (accessResponse.data.allowed) {
          setLoading("Getting details...");
          const pdfResponse = await axiosInstance.get(`/api/cv/${cvId}/pdf`);
          setPdfUrl(pdfResponse.data.pdfUrl);
        } else {
          navigate("/cv-review/to-review");
        }
      } catch (err) {
        console.error("Error checking access or fetching PDF:", err);
        setHasAccess(false);
        navigate("/cv-review/to-review");
      } finally {
        setLoading("");
      }
    };

    checkAccess();
  }, [cvId, navigate]);

  const handleSubmit = async () => {
    if (!remark.trim()) {
      toast.error("Please add comments before submitting.");
      return;
    } else if (remark.length > 500) {
      toast.error("Your remarks exceed 500 characters.");
    }
    try {
      setLoading("Submitting remarks...");
      const response = await axiosInstance.post(`/api/cv/${cvId}/review`, {
        remarks: remark,
      });
      if (response.status === 200) {
        setRemark("");
        navigate("/cv-review/to-review", {
          state: { successMessage: "Remarks submitted successfully!" },
        });
      } else {
        toast.error("Error submitting CV review. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading("");
    }
  };

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

      <h2 className={styles.remarksHeading}>Remarks</h2>

      <textarea
        name="comments"
        id="comments"
        rows={12}
        className={styles.textarea}
        placeholder="Comments"
        value={remark}
        onChange={(e) => setRemark(e.target.value)}
      ></textarea>

      <Button color={"secondary"} roundness={"rounded"} onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default CVFeedbackCreate;
