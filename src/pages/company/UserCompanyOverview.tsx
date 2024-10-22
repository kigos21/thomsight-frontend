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
  const [reviewForm, setReviewForm] = useState({
    rating: "",
    description: "",
  });

  // SAMPLE DATA
  const [reviewData, setReviewData] = useState([
    {
      id: 1,
      internName: "John Doe Villarin",
      rating: "5",
      date: "01/27/2024",
      reviewDescription:
        "I loved the experience! Learned a lot and grew professionally.",
    },
    {
      id: 2,
      internName: "Jane Smith",
      rating: "4",
      date: "02/10/2024",
      reviewDescription:
        "Great environment, fantastic mentors. Would definitely recommend.",
    },
    {
      id: 3,
      internName: "Alex Johnson",
      rating: "4",
      date: "03/05/2024",
      reviewDescription:
        "Challenging tasks but rewarding experience. Improved my skills significantly.",
    },
  ]);

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
    setReviewForm(updatedReview);
  };

  const handleCancel = () => {
    setIsAddingReview(false);
    setReviewForm({ rating: "", description: "" });
  };

  const handleReviewChange = (
    id: number,
    updatedRating: string,
    updatedDescription: string
  ) => {
    const newReviews = reviewData.map((review) => {
      if (review.id != id) {
        return review;
      }

      return {
        ...review,
        rating: updatedRating,
        reviewDescription: updatedDescription,
      };
    });

    setReviewData(newReviews);
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
                review={reviewForm}
                onSave={handleSave}
                onChange={handleChange}
                onCancel={handleCancel}
              />
            )}
            {reviewData.map((review) => (
              <ReviewItem
                key={review.id}
                internName={review.internName}
                rating={review.rating}
                date={review.date}
                reviewDescription={review.reviewDescription}
                onReviewChange={(updatedReview: {
                  rating: string;
                  description: string;
                }) =>
                  handleReviewChange(
                    review.id,
                    updatedReview.rating,
                    updatedReview.description
                  )
                }
              />
            ))}
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
