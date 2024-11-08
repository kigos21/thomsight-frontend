import styles from "./CVReviewed.module.scss";

import CVCard from "../../components/ui/cv/CVCard";
import { useEffect, useState } from "react";
import { CV } from "../../types/types";
import axiosInstance from "../../services/axiosInstance";
import Spinner from "../../components/ui/Spinner";

const CVReviewed = () => {
  const [cvs, setCvs] = useState<CV[]>([]);
  const [loading, setLoading] = useState<string>("Fetching CVs...");

  useEffect(() => {
    const fetchReviewedCVs = async () => {
      try {
        const response = await axiosInstance.get("/api/cvs/reviewed");
        setCvs(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading("");
      }
    };

    fetchReviewedCVs();
  }, []);

  return (
    <div className={styles.rootContainer}>
      {loading && <Spinner message={loading} />}
      {cvs.map((cv) => (
        <CVCard
          key={cv.id}
          name={cv.name}
          fileTitle={cv.file}
          description={cv.description}
          buttonVariant="submitted"
          url={`/cv-review/view/${cv.id}`}
        />
      ))}
    </div>
  );
};

export default CVReviewed;
