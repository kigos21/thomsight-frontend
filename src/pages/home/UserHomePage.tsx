import { IconSearch } from "@tabler/icons-react";
import MultiSelect from "../../components/form/MultiSelect";
import PaddedContainer from "../../components/layout/PaddedContainer";
import HomeCompanyItem from "../../components/ui/home/HomeCompanyItem";
import Spinner from "../../components/ui/Spinner";
import { useState } from "react";
import { useCompanies } from "../../contexts/CompaniesContext";
import { useNavigate } from "react-router-dom";

import styles from "./UserHomePage.module.scss";

export default function UserHomePage() {
  const { companies, jobs, loading, error } = useCompanies();
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const navigate = useNavigate();

  const jobOptions = jobs
    ? jobs.map((job) => ({ label: job.title, value: job.title }))
    : [];

  if (loading)
    return <Spinner message="Please wait while we render relevant data!" />;
  if (error) return <div>{error}</div>;

  const handleJobSelect = (selected: string[]) => {
    setSelectedJobs(selected);
  };

  const filteredCompanies =
    selectedJobs.length > 0 && companies
      ? companies.filter(
          (company) =>
            company.deleted_at === null &&
            company.jobs?.some((job) => selectedJobs.includes(job.title)) &&
            company.name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : companies?.filter(
          (company) =>
            company.deleted_at === null &&
            company.name?.toLowerCase().includes(searchQuery.toLowerCase())
        ) || [];

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const paginatedCompanies = filteredCompanies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCompanyClick = (slug: string | undefined) => {
    navigate(`/company/${slug}`);
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

  console.log(filteredCompanies);

  return (
    <PaddedContainer classNames={styles.container}>
      <div className={styles.filterSection}>
        <IconSearch className={styles.iconSearch} />
        <input
          type="text"
          placeholder="Keywords, Company"
          className={styles.searchBox}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <MultiSelect
          options={jobOptions}
          className={styles.jobClassification}
          onChange={handleJobSelect}
        />
      </div>

      <h1 className={styles.h1}>Companies</h1>

      {paginatedCompanies.length > 0 ? (
        <div className={styles.itemContainer}>
          {paginatedCompanies.map((company) => (
            <div
              key={company.id}
              onClick={() => handleCompanyClick(company.slug)}
            >
              <HomeCompanyItem company={company} />
            </div>
          ))}
        </div>
      ) : (
        <div>No companies found.</div>
      )}

      {filteredCompanies.length > 0 && totalPages > 1 && (
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
                onClick={() => setCurrentPage(page)}
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
