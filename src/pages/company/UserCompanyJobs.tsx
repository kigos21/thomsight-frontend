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
        {/* <JobItem
          jobTitle="Java Developer"
          companyName="Accenture"
          jobDescription="this is your work so do well lorem morel ako ikaw siya tayo lahat sino siya sino ako "
        ></JobItem>
        <JobItem
          jobTitle="Frontend Master"
          companyName="Emerson"
          jobDescription="this is your work so do well lorem morel ako ikaw siya tayo lahat sino siya sino ako "
        ></JobItem> */}
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
          <div>No jobs available.</div>
        )}
      </div>
    </PaddedContainer>
  );
}
