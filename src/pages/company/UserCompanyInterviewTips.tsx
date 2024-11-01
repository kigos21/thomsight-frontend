import PaddedContainer from "../../components/layout/PaddedContainer";
import InterviewTipsItem from "../../components/ui/company/InterviewTipsItem";
import CompanyInterviewTipForm from "../../components/ui/company/CompanyInterviewTipForm";
import styles from "./UserCompanyInterviewTips.module.scss";
import { useParams } from "react-router-dom";
import { useCompanies } from "../../contexts/CompaniesContext";
import { useUser } from "../../contexts/UserContext";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import SuccessMessage from "../../components/form/SuccessMessage";
import ValidationError from "../../components/form/ValidationError";
import { containsBadWords } from "../../badWordsFilter";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";

export type Tip = {
  id?: number;
  title: string;
  description: string;
  posted_by?: string;
};

export default function UserCompanyInterviewTips() {
  const { user } = useUser();
  const [isAddingTip, setIsAddingTip] = useState<boolean>(false);
  const [tip, setTip] = useState({
    title: "",
    description: "",
  });

  const [error, setError] = useState<string>("");
  const [titleError, setTitleError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [loading, setLoading] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const { slug } = useParams<{ slug: string }>();
  const { getCompanyBySlug } = useCompanies();
  const company = getCompanyBySlug(slug as string);
  const [tips, setTips] = useState<Tip[]>([]);

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

  if (!company) {
    return <div></div>;
  }

  const handleSave = async () => {
    setError("");
    setTitleError("");
    setDescriptionError("");
    setSuccess("");
    let isValid = true;

    if (containsBadWords(tip.title)) {
      setDescriptionError("Your tip contains inappropriate language.");
      isValid = false;
    }

    if (containsBadWords(tip.description)) {
      setDescriptionError("Your tip contains inappropriate language.");
      isValid = false;
    }

    if (tip.title.length > 60) {
      setDescriptionError("Title cannot exceed 60 characters.");
      isValid = false;
    }

    if (tip.description.length > 500) {
      setDescriptionError("Tip description cannot exceed 500 characters.");
      isValid = false;
    }

    if (!isValid) return;

    try {
      setLoading("Creating tips...");
      await axiosInstance.post(`/api/company/${slug}/tips/create`, {
        title: tip.title,
        content: tip.description,
      });
      setIsAddingTip(false);
      setTip({ title: "", description: "" });
      setSuccess("Tip created successfully");
      setLoading("Refetching tips...");
      const response = await axiosInstance.get(`/api/company/${slug}/tips`);
      setTips(response.data);
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
    setSuccess("Tip updated successfully");
    setError("");
  };

  const handleTipDelete = (id: number | undefined) => {
    setTips((prevTips) => prevTips.filter((tip) => tip.id !== id));
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
              classNames={styles.replyButton}
              onClick={() => {
                setIsAddingTip(true);
                setSuccess("");
              }}
            >
              Add Tip
            </Button>
          )}
        </div>

        {success && <SuccessMessage message={success} />}
        {error && <ValidationError message={error} />}
        {isAddingTip && (
          <CompanyInterviewTipForm
            tip={tip}
            onSave={handleSave}
            onChange={handleChange}
            onCancel={handleCancel}
            error={error}
            titleError={titleError}
            descriptionError={descriptionError}
          />
        )}
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

      {tips.map((tip) => (
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
          setSuccess={setSuccess}
          setError={setError}
          setLoading={setLoading}
        />
      ))}
    </PaddedContainer>
  );
}
