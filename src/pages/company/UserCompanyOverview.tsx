import PaddedContainer from "../../components/layout/PaddedContainer";
import ReviewItem from "../../components/ui/company/ReviewItem";
import StyledBox from "../../components/layout/StyledBox";
import styles from "./UserCompanyOverview.module.scss";
import Button from "../../components/ui/Button";
import { useParams } from "react-router-dom";
import { useCompanies } from "../../contexts/CompaniesContext";
import { useEffect, useState } from "react";
import CompanyReviewForm from "../../components/ui/company/CompanyReviewForm";
import axiosInstance from "../../services/axiosInstance";
import Spinner from "../../components/ui/Spinner";
import SuccessMessage from "../../components/form/SuccessMessage";
import ValidationError from "../../components/form/ValidationError";
import { containsBadWords } from "../../badWordsFilter";
import { useUser } from "../../contexts/UserContext";

export type Review = {
  id?: number;
  rating: string;
  description: string;
  posted_by?: string;
  date?: string | number | Date;
  poster_name?: string;
};

export default function UserCompanyOverview() {
  const { user } = useUser();
  const [isAddingReview, setIsAddingReview] = useState<boolean>(false);
  const [review, setReview] = useState({
    rating: "",
    description: "",
  });

  const [error, setError] = useState<string>("");
  const [ratingError, setRatingError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [loading, setLoading] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const { slug } = useParams<{ slug: string }>();
  const { getCompanyBySlug } = useCompanies();
  const company = getCompanyBySlug(slug as string);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading("Fetching reviews...");
        const response = await axiosInstance.get(
          `/api/company/${slug}/reviews`
        );
        setReviews(response.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading("");
      }
    };

    fetchReviews();
  }, [slug]);

  if (!company) {
    return <div></div>;
  }

  const handleSave = async () => {
    setError("");
    setRatingError("");
    setDescriptionError("");
    setSuccess("");
    let isValid = true;

    if (containsBadWords(review.description)) {
      setDescriptionError("Your review contains inappropriate language.");
      isValid = false;
    }

    const ratingValue = parseInt(review.rating, 10);
    if (!ratingValue || ratingValue < 1 || ratingValue > 5) {
      setRatingError("Rating must be a number between 1 and 5.");
      isValid = false;
    }

    if (review.description.length > 255) {
      setDescriptionError("Review cannot exceed 255 characters.");
      isValid = false;
    }

    if (!isValid) return;

    try {
      setLoading("Creating review...");
      await axiosInstance.post(`/api/company/${slug}/reviews/create`, {
        rating: review.rating,
        description: review.description,
      });
      setIsAddingReview(false);
      setReview({ rating: "", description: "" });
      setSuccess("Review created successfully");
      setLoading("Refetching reviews...");
      const response = await axiosInstance.get(`/api/company/${slug}/reviews`);
      setReviews(response.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading("");
    }
  };

  const handleChange = (updatedReview: Review) => {
    setReview(updatedReview);
  };

  const handleCancel = () => {
    setIsAddingReview(false);
    setReview({ rating: "", description: "" });
  };

  const handleReviewChange = (
    id: number | undefined,
    updatedRating: string,
    updatedDescription: string
  ) => {
    // // HOW TO ACTUALLY HANDLE REVIEW CHANGE?
    // console.log(
    //   JSON.stringify({ id, updatedRating, updatedDescription }, null, 2)
    // );
    setReviews((currentReviews) =>
      currentReviews.map((rev) =>
        rev.id === id
          ? { ...rev, rating: updatedRating, description: updatedDescription }
          : rev
      )
    );
    setSuccess("Review updated successfully");
    setError("");
  };

  const handleReviewDelete = (id: number | undefined) => {
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.id !== id)
    );
  };

  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      {loading && <Spinner message={loading} />}
      <div className={styles.container}>
        <div className={styles.leftcontainer}>
          <div className={styles.titleContainer}>
            <h2 className={styles.titleHeader}>Company Description</h2>
            <p>{company.description}</p>
          </div>
          <div className={styles.reviewContainer}>
            <div className={styles.reviewHeaderContainer}>
              <h2 className={styles.titleHeader}>Reviews</h2>
              {user?.role === "Alumni" && (
                <Button
                  color="primary"
                  roundness="rounded"
                  classNames={styles.replyButton}
                  onClick={() => {
                    setIsAddingReview(true);
                    setSuccess("");
                  }}
                >
                  Write a Review
                </Button>
              )}
            </div>
            {success && <SuccessMessage message={success} />}
            {error && <ValidationError message={error} />}
            {isAddingReview && (
              <CompanyReviewForm
                review={review}
                onSave={handleSave}
                onChange={handleChange}
                onCancel={handleCancel}
                error={error}
                ratingError={ratingError}
                descriptionError={descriptionError}
              />
            )}
            {reviews.map((review) => (
              <ReviewItem
                key={review.id}
                id={review.id}
                internName={review.poster_name}
                posted_by={review.posted_by}
                rating={review.rating}
                date={
                  review.date
                    ? new Date(review.date).toLocaleDateString()
                    : "N/A"
                }
                reviewDescription={review.description}
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
                setSuccess={setSuccess}
                onReviewDelete={handleReviewDelete}
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
