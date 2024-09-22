import PaddedContainer from "../../components/layout/PaddedContainer";
import JobItem from "../../components/ui/company/JobItem";
import styles from "./UserCompanyJobs.module.scss";

export default function UserCompanyJobs() {
  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      <h2>Job Description</h2>
      <div className={styles.boxContainer}>
        <JobItem
          jobTitle="Java Developer"
          companyName="Accenture"
          jobDescription="this is your work so do well lorem morel ako ikaw siya tayo lahat sino siya sino ako "
        ></JobItem>
        <JobItem
          jobTitle="Frontend Master"
          companyName="Emerson"
          jobDescription="this is your work so do well lorem morel ako ikaw siya tayo lahat sino siya sino ako "
        ></JobItem>
      </div>
    </PaddedContainer>
  );
}
