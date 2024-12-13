import { useEffect, useState } from "react";
import CVCard from "../../components/ui/cv/CVCard";
import styles from "./CVListing.module.scss";
import { CV } from "../../types/types";
import axiosInstance from "../../services/axiosInstance";
import Spinner from "../../components/ui/Spinner";
import { toast } from "react-toastify";
import DeletePopUp from "../../components/ui/company/DeletePopUp";

const CVListing = () => {
  const [cvs, setCvs] = useState<CV[]>([]);
  const [loading, setLoading] = useState<string>("Fetching CVs...");
  const [isDeletePopupVisible, setDeletePopupVisible] = useState(false);
  const [cvToDelete, setCvToDelete] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchCVs = async () => {
      try {
        const response = await axiosInstance.get("/api/cvs");
        setCvs(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading("");
      }
    };

    fetchCVs();
  }, []);

  const totalPages = Math.ceil(cvs.length / itemsPerPage);
  const paginatedCVs = cvs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const confirmDeleteCV = (cvId: number) => {
    setCvToDelete(cvId);
    setDeletePopupVisible(true);
  };

  const handleRequestAccess = async (cvId: number) => {
    try {
      setLoading("Requesting access...");
      await axiosInstance.post(`/api/cv/${cvId}/request-access`);
      toast.success("Your request has been submitted.");
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading("");
    }

    await axiosInstance.post(`/api/cv/request-email`, { cvId });
  };

  const handleDeleteCV = async () => {
    if (cvToDelete === null) return;
    try {
      setLoading("Deleting CV...");
      const response = await axiosInstance.delete(
        `/api/cv/${cvToDelete}/delete`
      );
      console.log(response);
      setCvs((prevCvs) => prevCvs.filter((cv) => cv.id !== cvToDelete));
      toast.success("CV deleted successfully.");
      setCurrentPage(1);
    } catch (error: any) {
      toast.error("Failed to delete CV.");
      console.error(error);
    } finally {
      setLoading("");
      setDeletePopupVisible(false);
      setCvToDelete(null);
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
            buttonVariant={cv.mine ? "delete" : "request-access"}
            onButtonClick={() =>
              cv.mine ? confirmDeleteCV(cv.id) : handleRequestAccess(cv.id)
            }
          />
        ))}
        {cvs.length === 0 && !loading && (
          <div style={{ fontSize: "1.25rem" }}>No CVs available.</div>
        )}
        <DeletePopUp
          isVisible={isDeletePopupVisible}
          onClose={() => setDeletePopupVisible(false)}
          onDelete={handleDeleteCV}
          heading="Delete CV"
          details="Are you sure you want to delete this CV?"
        />
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

export default CVListing;
