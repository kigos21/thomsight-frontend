import { useEffect, useState } from "react";
import CVCard from "../../components/ui/cv/CVCard";
import styles from "./CVListing.module.scss";
import { CV } from "../../types/types";
import axiosInstance from "../../services/axiosInstance";
import Spinner from "../../components/ui/Spinner";
import { useOutletContext } from "react-router-dom";

const CVListing = () => {
  const { setSuccess } = useOutletContext<{
    setSuccess: (message: string) => void;
  }>();
  const { setError } = useOutletContext<{
    setError: (message: string) => void;
  }>();
  const [cvs, setCvs] = useState<CV[]>([]);
  const [loading, setLoading] = useState<string>("Fetching CVs...");

  useEffect(() => {
    const fetchCVs = async () => {
      try {
        const response = await axiosInstance.get("/api/cvs");
        setCvs(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading("");
      }
    };

    fetchCVs();
  }, []);

  const handleRequestAccess = async (cvId: number) => {
    setError("");
    setSuccess("");
    try {
      setLoading("Requesting access...");
      await axiosInstance.post(`/api/cv/${cvId}/request-access`);
      setSuccess("Your request has been submitted.");
    } catch (error: any) {
      setError(error.response.data.message);
    } finally {
      setLoading("");
    }
  };

  return (
    <div className={styles.rootContainer}>
      {loading && <Spinner message={loading} />}

      {cvs.map((cv) => (
        <CVCard
          key={cv.id}
          name={cv.name}
          fileTitle={cv.file}
          description={cv.description}
          buttonVariant="request-access"
          onButtonClick={() => handleRequestAccess(cv.id)}
        />
      ))}
    </div>
  );
};

export default CVListing;
