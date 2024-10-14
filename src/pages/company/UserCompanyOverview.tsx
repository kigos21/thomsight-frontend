import PaddedContainer from "../../components/layout/PaddedContainer";
import ReviewItem from "../../components/ui/company/ReviewItem";
import StyledBox from "../../components/layout/StyledBox";
import styles from "./UserCompanyOverview.module.scss";
import Button from "../../components/ui/Button";
import { useParams } from "react-router-dom";
import { useCompanies } from "../../contexts/CompaniesContext";
import { useState } from "react";
import CompanyReviewForm from "../../components/ui/company/CompanyReviewForm";

type Review = {
  rating: string;
  description: string;
};

export default function UserCompanyOverview() {
  const [isAddingReview, setIsAddingReview] = useState<boolean>(true);
  const [review, setReview] = useState({
    rating: "",
    description: "",
  });

  const { slug } = useParams<{ slug: string }>();
  const { getCompanyBySlug } = useCompanies();
  const company = getCompanyBySlug(slug as string);

  if (!company) {
    return <div></div>;
  }

  const handleSave = () => {
    console.log("Save");
  };

  const handleChange = (updatedReview: Review) => {
    setReview(updatedReview);
  };

  const handleCancel = () => {
    setIsAddingReview(false);
    setReview({ rating: "", description: "" });
  };

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
                onClick={() => setIsAddingReview(true)}
              >
                Write a Review
              </Button>
            </div>
            {isAddingReview && (
              <CompanyReviewForm
                review={review}
                onSave={handleSave}
                onChange={handleChange}
                onCancel={handleCancel}
              />
            )}
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
