import PaddedContainer from "../../components/layout/PaddedContainer";
import JobItem from "../../components/ui/JobItem";
import styles from "./UserCompanyJobs.module.scss";
import { useCompanyData } from "../../api/companyData";

export default function UserCompanyJobs() {
  const { company, loading, error } = useCompanyData();

  //temporary placeholders
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!company) {
    return <div>No company found.</div>;
  }

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
        {company.jobs && company.jobs.length > 0 ? (
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
