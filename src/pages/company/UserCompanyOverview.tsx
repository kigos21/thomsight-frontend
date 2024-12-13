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
import { containsBadWords } from "../../badWordsFilter";
import { useUser } from "../../contexts/UserContext";
import { toast } from "react-toastify";
import ErrorPage from "../ErrorPage";
import DOMPurify from "dompurify";

export type Review = {
  id?: number;
  rating: string;
  description: string;
  posted_by?: string;
  date?: string | number | Date;
  poster_name?: string;
  user_id?: number;
};

export default function UserCompanyOverview() {
  const { user } = useUser();
  const [isAddingReview, setIsAddingReview] = useState<boolean>(false);
  const [review, setReview] = useState({
    rating: "",
    description: "",
  });
  const [loading, setLoading] = useState<string>("");
  const { slug } = useParams<{ slug: string }>();
  const { getCompanyBySlug, loading: companyLoading, error } = useCompanies();
  const [reviews, setReviews] = useState<Review[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

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

  if (companyLoading)
    return <Spinner message="Please wait while we render relevant data!" />;
  if (error) return <ErrorPage />;
  const company = getCompanyBySlug(slug as string);

  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const paginatedReviews = reviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSave = async () => {
    let isValid = true;

    if (containsBadWords(review.description)) {
      toast.error("Your review contains inappropriate language.");
      isValid = false;
    }

    const ratingValue = parseFloat(review.rating);
    if (
      isNaN(ratingValue) ||
      !Number.isInteger(ratingValue) ||
      ratingValue < 1 ||
      ratingValue > 5
    ) {
      toast.error("Rating must be an integer between 1 and 5.");
      isValid = false;
    }

    if (review.description.length > 2500) {
      toast.error("Review cannot exceed 2500 characters.");
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
      setLoading("Refetching reviews...");
      const response = await axiosInstance.get(`/api/company/${slug}/reviews`);
      setReviews(response.data);
      toast.success("Review created successfully");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
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
    setReviews((currentReviews) =>
      currentReviews.map((rev) =>
        rev.id === id
          ? {
              ...rev,
              rating: updatedRating !== undefined ? updatedRating : rev.rating,
              description: updatedDescription,
            }
          : rev
      )
    );
  };

  const handleReviewDelete = (id: number | undefined) => {
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.id !== id)
    );
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePageSelect = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      {loading && <Spinner message={loading} />}
      <div className={styles.container}>
        <div className={styles.leftcontainer}>
          <div className={styles.titleContainer}>
            <h2 className={styles.titleHeader}>Company Description</h2>
            {company && (
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    company.description || "No company description"
                  ),
                }}
              ></p>
            )}
          </div>

          <div className={styles.rightcontainerMobile}>
            <StyledBox paddedContainerClass={styles.styledBox}>
              <div className={styles.noteContainer}>
                <div className={styles.companySize}>
                  <h5>Company Size</h5>
                  <p>{company?.size}</p>
                </div>
                <div className={styles.industry}>
                  <h5>Industry</h5>
                  <p>{company?.industry}</p>
                </div>
              </div>
            </StyledBox>
          </div>

          <div className={styles.reviewContainer}>
            <div className={styles.reviewHeaderContainer}>
              <h2 className={styles.titleHeader} id="reviews">
                Reviews
              </h2>
              {user?.role === "Alumni" && (
                <Button
                  color="primary"
                  roundness="rounded"
                  classNames={styles.replyButton}
                  onClick={() => {
                    setIsAddingReview(true);
                  }}
                >
                  Write a Review
                </Button>
              )}
            </div>
            {isAddingReview && (
              <CompanyReviewForm
                review={review}
                onSave={handleSave}
                onChange={handleChange}
                onCancel={handleCancel}
              />
            )}
            {reviews.length === 0 && (
              <em style={{ fontSize: "0.875rem" }}>
                There's no data available currently!
              </em>
            )}
            {paginatedReviews.map((review) => (
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
                reviewDescription={DOMPurify.sanitize(review.description)}
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
                onReviewDelete={handleReviewDelete}
                user_id={review.user_id}
              />
            ))}

            {reviews.length > itemsPerPage && (
              <div className={styles.pagination}>
                <button
                  className={`${styles.paginationButton} ${currentPage === 1 ? styles.disabled : ""}`}
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  &#60; Previous
                </button>
                <button
                  className={`${styles.paginationButton} ${currentPage === 1 ? styles.disabled : ""}`}
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  First
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1)
                  .slice(
                    Math.max(currentPage - 2, 0),
                    Math.min(currentPage + 1, totalPages)
                  )
                  .map((page) => (
                    <button
                      key={page}
                      className={`${styles.paginationButton} ${currentPage === page ? styles.active : ""}`}
                      onClick={() => handlePageSelect(page)}
                    >
                      {page}
                    </button>
                  ))}

                <button
                  className={`${styles.paginationButton} ${currentPage === totalPages ? styles.disabled : ""}`}
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  Last
                </button>
                <button
                  className={`${styles.paginationButton} ${currentPage === totalPages ? styles.disabled : ""}`}
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next &#62;
                </button>
              </div>
            )}
          </div>
        </div>
        <div className={styles.rightcontainer}>
          <StyledBox paddedContainerClass={styles.styledBox}>
            <div className={styles.noteContainer}>
              <div className={styles.companySize}>
                <h5>Company Size</h5>
                <p>{company?.size}</p>
              </div>
              <div className={styles.industry}>
                <h5>Industry</h5>
                <p>{company?.industry}</p>
              </div>
            </div>
          </StyledBox>
        </div>
      </div>
    </PaddedContainer>
  );
}
