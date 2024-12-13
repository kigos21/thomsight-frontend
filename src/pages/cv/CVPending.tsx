import styles from "./CVPending.module.scss";

import CVCard from "../../components/ui/cv/CVCard";
import { useEffect, useState } from "react";
import { CV } from "../../types/types";
import axiosInstance from "../../services/axiosInstance";
import Spinner from "../../components/ui/Spinner";
import { toast } from "react-toastify";

const CVPending = () => {
  const [cvs, setCvs] = useState<CV[]>([]);
  const [loading, setLoading] = useState<string>("Fetching CVs...");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchPendingCVs = async () => {
      try {
        const response = await axiosInstance.get("/api/cvs/pending");
        setCvs(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading("");
      }
    };

    fetchPendingCVs();
  }, []);

  const totalPages = Math.ceil(cvs.length / itemsPerPage);
  const paginatedCVs = cvs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const acceptRequest = async (id: number) => {
    try {
      setLoading("Accepting request...");
      const response = await axiosInstance.post(`/api/cv/${id}/accept`);
      if (response.data.success) {
        toast.success("Request accepted successfully.");
        setCvs(cvs.filter((cv) => cv.id !== id));
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to accept request. Please try again later.");
    } finally {
      setLoading("");
    }

    await axiosInstance.post(`/api/cv/accept-email`, { id });
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
            buttonVariant="accept-request"
            onButtonClick={() => acceptRequest(cv.id)}
          />
        ))}
        {cvs.length === 0 && !loading && (
          <div style={{ fontSize: "1.25rem" }}>
            No pending requests available.
          </div>
        )}
      </div>
      {cvs.length > itemsPerPage && (
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

export default CVPending;
