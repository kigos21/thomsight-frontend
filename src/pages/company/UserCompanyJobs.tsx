import PaddedContainer from "../../components/layout/PaddedContainer";
import JobItem from "../../components/ui/company/JobItem";
import styles from "./UserCompanyJobs.module.scss";
import Spinner from "../../components/ui/Spinner";
import { useCompanies } from "../../contexts/CompaniesContext";
import { useParams } from "react-router-dom";

export default function UserCompanyJobs() {
  const { slug } = useParams<{ slug: string }>();
  const { loading, error, getCompanyBySlug } = useCompanies();

  if (loading) {
    return <Spinner message="Please wait while we render relevant data!" />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  const company = getCompanyBySlug(slug as string);

  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      <h2>Job Description</h2>
      <div className={styles.boxContainer}>
        {company?.jobs && company.jobs.length > 0 ? (
          company.jobs.map((job, index) => (
            <JobItem
              key={index}
              jobTitle={job.title}
              companyName={company.name}
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
            There's no data available currently!
          </em>
        )}
      </div>
    </PaddedContainer>
  );
}
