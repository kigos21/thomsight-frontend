import PaddedContainer from "../../components/layout/PaddedContainer";
import CompanyLayout from "../../components/layout/CompanyLayout";
import StyledBox from "../../components/layout/StyledBox";
import JobItem from "../../components/layout/JobItem";
import styles from "./UserHomePage.module.scss";

export default function UserHomePage() {
  return (
    <PaddedContainer>
      <StyledBox classNames={styles.styledBox}>
        <h1 className={styles.sample}>This is the home page</h1>
        {/* try lang ulit for seeing */}
      </StyledBox>
      <JobItem
        classNames=""
        jobTitle="Java Developer"
        companyName="Accenture"
        jobDescription="this is your fucking work"
      ></JobItem>
    </PaddedContainer>
  );
}
