import PaddedContainer from "../../components/layout/PaddedContainer";
import InterviewTipsItem from "../../components/ui/company/InterviewTipsItem";
import CompanyInterviewTipForm from "../../components/ui/company/CompanyInterviewTipForm";
import styles from "./UserCompanyInterviewTips.module.scss";
import { useParams } from "react-router-dom";
import { useCompanies } from "../../contexts/CompaniesContext";
import { useUser } from "../../contexts/UserContext";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { containsBadWords } from "../../badWordsFilter";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import { toast } from "react-toastify";
import ErrorPage from "../ErrorPage";

export type Tip = {
  id?: number;
  title: string;
  description: string;
  posted_by?: string;
  poster_id?: number;
};

export default function UserCompanyInterviewTips() {
  const { user } = useUser();
  const [isAddingTip, setIsAddingTip] = useState<boolean>(false);
  const [tip, setTip] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState<string>("");
  const { slug } = useParams<{ slug: string }>();
  const { getCompanyBySlug, loading: companyLoading, error } = useCompanies();
  const [tips, setTips] = useState<Tip[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    const fetchInterviewTips = async () => {
      try {
        setLoading("Fetching interview tips...");
        const response = await axiosInstance.get(`/api/company/${slug}/tips`);
        setTips(response.data);
      } catch (err) {
        console.error("Error fetching interview tips:", err);
      } finally {
        setLoading("");
      }
    };

    fetchInterviewTips();
  }, [slug]);

  if (companyLoading)
    return <Spinner message="Please wait while we render relevant data!" />;
  if (error) return <ErrorPage />;
  getCompanyBySlug(slug as string);

  const totalPages = Math.ceil(tips.length / itemsPerPage);
  const paginatedTips = tips.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSave = async () => {
    if (!tip.title.trim()) {
      toast.error("Title should not be left blank");
      return;
    }
    if (!tip.description.trim()) {
      toast.error("Description should not be left blank");
      return;
    }
    if (containsBadWords(tip.title)) {
      toast.error("Your tip contains inappropriate language.");
      return;
    }

    if (containsBadWords(tip.description)) {
      toast.error("Your tip contains inappropriate language.");
      return;
    }

    if (tip.title.length > 100) {
      toast.error("Title cannot exceed 100 characters.");
      return;
    }

    if (tip.description.length > 1500) {
      toast.error("Tip description cannot exceed 1500 characters.");
      return;
    }

    try {
      setLoading("Creating tips...");
      await axiosInstance.post(`/api/company/${slug}/tips/create`, {
        title: tip.title,
        content: tip.description,
      });
      setIsAddingTip(false);
      setTip({ title: "", description: "" });
      toast.success("Tip created successfully");
      setLoading("Refetching tips...");
      const response = await axiosInstance.get(`/api/company/${slug}/tips`);
      setTips(response.data);
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

  const handleChange = (updatedTip: Tip) => {
    setTip(updatedTip);
  };

  const handleCancel = () => {
    setIsAddingTip(false);
    setTip({ title: "", description: "" });
  };

  const handleTipChange = (
    id: number | undefined,
    updatedTitle: string,
    updatedDescription: string
  ) => {
    setTips((currentTips) =>
      currentTips.map((tp) =>
        tp.id === id
          ? { ...tp, title: updatedTitle, description: updatedDescription }
          : tp
      )
    );
  };

  const handleTipDelete = (id: number | undefined) => {
    setTips((prevTips) => prevTips.filter((tip) => tip.id !== id));
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
      <div className={styles.tipContainer}>
        <div className={styles.tipHeaderContainer}>
          <h2>Interview Tips</h2>
          {user?.role === "Alumni" && (
            <Button
              color="primary"
              roundness="rounded"
              classNames={styles.tipButton}
              onClick={() => {
                setIsAddingTip(true);
              }}
            >
              Add Tip
            </Button>
          )}
        </div>
      </div>

      <div className={styles.informationContainer}>
        <p>
          Welcome to the Interview Tips and Guidance Page. Here, you'll find
          valuable insights and practical advice from former interns and
          industry professionals to help you excel in your interviews. Explore
          comprehensive strategies and best practices to enhance your
          preparation and boost your confidence.
        </p>
      </div>

      {isAddingTip && (
        <CompanyInterviewTipForm
          tip={tip}
          onSave={handleSave}
          onChange={handleChange}
          onCancel={handleCancel}
        />
      )}

      {tips.length === 0 && (
        <em style={{ fontSize: "0.875rem" }}>
          There's no data available currently!
        </em>
      )}
      {paginatedTips.map((tip) => (
        <InterviewTipsItem
          key={tip.id}
          id={tip.id}
          internName={tip.posted_by}
          subjectHeading={tip.title}
          tipDescription={tip.description}
          onTipChange={(updatedTip) =>
            handleTipChange(tip.id, updatedTip.title, updatedTip.description)
          }
          onTipDelete={handleTipDelete}
          setLoading={setLoading}
          poster_id={tip.poster_id}
        />
      ))}

      {tips.length > itemsPerPage && (
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
    </PaddedContainer>
  );
}
