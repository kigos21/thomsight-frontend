import styles from "./CVMyRequests.module.scss";

import CVCard from "../../components/ui/cv/CVCard";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { CV } from "../../types/types";
import Spinner from "../../components/ui/Spinner";
import DeletePopUp from "../../components/ui/company/DeletePopUp";
import { toast } from "react-toastify";

const CVMyRequests = () => {
  const [requestedCVs, setRequestedCVs] = useState<CV[]>([]);
  const [reviewedCVs, setReviewedCVs] = useState<CV[]>([]);
  const [loading, setLoading] = useState<string>("Fetching CVs...");
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [selectedCVId, setSelectedCVId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCVs = async () => {
      try {
        const requestedResponse = await axiosInstance.get("/api/requested-cvs");
        setRequestedCVs(requestedResponse.data);
        const reviewedResponse = await axiosInstance.get("/api/reviewed-cvs");
        setReviewedCVs(reviewedResponse.data);
      } catch (error) {
        toast.error("Error fetching CVs:");
        console.error(error);
      } finally {
        setLoading("");
      }
    };

    fetchCVs();
  }, []);

  const handleDelete = async () => {
    if (!selectedCVId) return;
    try {
      setLoading("Cancelling request...");
      await axiosInstance.post(`/api/${selectedCVId}/cancel-request`);
      toast.success("Request cancelled successfully");
      setRequestedCVs(requestedCVs.filter((cv) => cv.id !== selectedCVId));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading("");
      setShowDeletePopup(false);
    }
  };

  return (
    <div className={styles.rootContainer}>
      {loading && <Spinner message={loading} />}
      {requestedCVs.map((cv) => (
        <>
          <CVCard
            key={cv.id}
            name={cv.name}
            fileTitle={cv.file}
            description={cv.description}
            buttonVariant="cancel"
            onButtonClick={() => {
              setSelectedCVId(cv.id);
              setShowDeletePopup(true);
            }}
          />
          {showDeletePopup && (
            <DeletePopUp
              isVisible={showDeletePopup}
              onClose={() => setShowDeletePopup(false)}
              onDelete={handleDelete}
              heading="Cancel Review Request"
              details="Are you sure you want to cancel your review request?"
            />
          )}
        </>
      ))}
      {reviewedCVs.map((cv) => (
        <CVCard
          key={cv.id}
          name={cv.name}
          fileTitle={cv.file}
          description={cv.description}
          buttonVariant="view-feedback"
          url={`/cv-review/view/${cv.id}`}
        />
      ))}
      {reviewedCVs.length === 0 && requestedCVs.length === 0 && (
        <div style={{ fontSize: "1.25rem" }}>This section is empty.</div>
      )}
    </div>
  );
};

export default CVMyRequests;
