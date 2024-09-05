import PaddedContainer from "../../components/layout/PaddedContainer";
import ReviewItem from "../../components/ui/ReviewItem";
import StyledBox from "../../components/layout/StyledBox";
import styles from "./UserCompanyOverview.module.scss";
import Button from "../../components/ui/Button";

export default function UserCompanyOverview() {
  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      <div className={styles.container}>
        <div className={styles.leftcontainer}>
          <div className={styles.titleContainer}>
            <h2 className={styles.titleHeader}>Company Description</h2>
            <p>
              Vitae turpis massa sed elementum tempus egestas sed. Neque egestas
              congue quisque egestas diam. Augue interdum velit euismod in
              pellentesque massa. At in tellus integer feugiat scelerisque
              varius morbi. Est pellentesque elit ullamcorper dignissim cras
              tincidunt lobortis. Sed id semper risus in. Sit amet porttitor
              eget dolor morbi non arcu risus.
            </p>
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
                <p>10 000 Employees</p>
              </div>
              <div className={styles.industry}>
                <h5>Industry</h5>
                <p>Financial Tech</p>
              </div>
            </div>
          </StyledBox>
        </div>
      </div>
    </PaddedContainer>
  );
}
