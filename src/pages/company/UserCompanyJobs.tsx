import PaddedContainer from "../../components/layout/PaddedContainer";
import JobItem from "../../components/ui/company/JobItem";
import styles from "./UserCompanyJobs.module.scss";
import Spinner from "../../components/ui/Spinner";
import { useCompanies } from "../../contexts/CompaniesContext";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function UserCompanyJobs() {
  const { slug } = useParams<{ slug: string }>();
  const { loading, error, getCompanyBySlug } = useCompanies();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  if (loading) {
    return <Spinner message="Please wait while we render relevant data!" />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  const company = getCompanyBySlug(slug as string);

  const totalPages = Math.ceil(company!.jobs!.length / itemsPerPage);
  const paginatedJobs = company!.jobs!.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
    <PaddedContainer classNames={styles.paddedContainer}>
      <h2>Job Description</h2>
      <div className={styles.boxContainer}>
        {paginatedJobs && paginatedJobs.length > 0 ? (
          paginatedJobs.map((job, index) => (
            <JobItem
              key={index}
              jobTitle={job.title}
              companyName={""}
              jobDescription={job.description}
            />
          ))
        ) : (
          <em
            style={{
              fontSize: "0.875rem",
              paddingTop: "1rem",
              display: "block",
            }}
          >
            There's no jobs available currently!
          </em>
        )}
      </div>

      {company!.jobs!.length > itemsPerPage && (
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
    </PaddedContainer>
  );
}
