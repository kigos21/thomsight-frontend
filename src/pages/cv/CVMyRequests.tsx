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

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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

  const combinedCVs = [...requestedCVs, ...reviewedCVs];

  const totalPages = Math.ceil(combinedCVs.length / itemsPerPage);
  const paginatedCVs = combinedCVs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePageSelect = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.rootContainer}>
        {loading && <Spinner message={loading} />}
        {paginatedCVs.map((cv) => (
          <CVCard
            key={cv.id}
            name={cv.name}
            fileTitle={cv.file}
            description={cv.description}
            buttonVariant={
              requestedCVs.find((requested) => requested.id === cv.id)
                ? "cancel"
                : "view-feedback"
            }
            onButtonClick={
              requestedCVs.find((requested) => requested.id === cv.id)
                ? () => {
                    setSelectedCVId(cv.id);
                    setShowDeletePopup(true);
                  }
                : undefined
            }
            url={
              reviewedCVs.find((reviewed) => reviewed.id === cv.id)
                ? `/cv-review/view/${cv.id}`
                : undefined
            }
          />
        ))}
        {showDeletePopup && (
          <DeletePopUp
            isVisible={showDeletePopup}
            onClose={() => setShowDeletePopup(false)}
            onDelete={handleDelete}
            heading="Cancel Review Request"
            details="Are you sure you want to cancel your review request?"
          />
        )}
        {combinedCVs.length === 0 && !loading && (
          <div style={{ fontSize: "1.25rem" }}>No requests made.</div>
        )}
      </div>
      {combinedCVs.length > itemsPerPage && (
        <div className={styles.pagination}>
          <button
            className={`${styles.paginationButton} ${currentPage === 1 ? styles.disabled : ""}`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            &#60; Previous
          </button>
          <button
            className={`${styles.paginationButton} ${currentPage === 1 ? styles.disabled : ""}`}
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            First
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1)
            .slice(
              Math.max(currentPage - 2, 0),
              Math.min(currentPage + 1, totalPages)
            )
            .map((page) => (
              <button
                key={page}
                className={`${styles.paginationButton} ${currentPage === page ? styles.active : ""}`}
                onClick={() => handlePageSelect(page)}
              >
                {page}
              </button>
            ))}

          <button
            className={`${styles.paginationButton} ${currentPage === totalPages ? styles.disabled : ""}`}
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last
          </button>
          <button
            className={`${styles.paginationButton} ${currentPage === totalPages ? styles.disabled : ""}`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next &#62;
          </button>
        </div>
      )}
    </div>
  );
};

export default CVMyRequests;
