import PaddedContainer from "../../components/layout/PaddedContainer";
import ReviewItem from "../../components/ui/company/ReviewItem";
import StyledBox from "../../components/layout/StyledBox";
import styles from "./UserCompanyOverview.module.scss";
import Button from "../../components/ui/Button";
import { useCompanyData } from "../../api/companyData";
import Spinner from "../../components/ui/Spinner";

export default function UserCompanyOverview() {
  const { company, loading, error } = useCompanyData();

  //temporary placeholders
  if (loading) {
    return <Spinner message="Please wait while we render relevant data!" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!company) {
    return <div>No company found.</div>;
  }

  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      <div className={styles.container}>
        <div className={styles.leftcontainer}>
          <div className={styles.titleContainer}>
            <h2 className={styles.titleHeader}>Company Description</h2>
            <p>{company.description}</p>
          </div>
          <div className={styles.reviewContainer}>
            <div className={styles.reviewHeaderContainer}>
              <h2 className={styles.titleHeader}>Reviews</h2>
              <Button
                color="primary"
                roundness="rounded"
                classNames={styles.replyButton}
              >
                Write a Review
              </Button>
            </div>
            <ReviewItem
              internName="John Doe Villarin"
              rating="5.0"
              date="01/27/2024"
              reviewDescription="i love the experience i love the experience i love the experience i love the experience i love the experience"
            ></ReviewItem>
          </div>
        </div>
        <div className={styles.rightcontainer}>
          <StyledBox paddedContainerClass={styles.styledBox}>
            <div className={styles.noteContainer}>
              <div className={styles.companySize}>
                <h5>Company Size</h5>
                <p>{company.size}</p>
              </div>
              <div className={styles.industry}>
                <h5>Industry</h5>
                <p>{company.industry}</p>
              </div>
            </div>
          </StyledBox>
        </div>
      </div>
    </PaddedContainer>
  );
}
