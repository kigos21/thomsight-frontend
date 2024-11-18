import styles from "./CVToReview.module.scss";

import CVCard from "../../components/ui/cv/CVCard";
import { useEffect, useState } from "react";
import { CV } from "../../types/types";
import axiosInstance from "../../services/axiosInstance";
import Spinner from "../../components/ui/Spinner";

const CVToReview = () => {
  const [cvs, setCvs] = useState<CV[]>([]);
  const [loading, setLoading] = useState<string>("Fetching CVs...");

  useEffect(() => {
    const fetchAcceptedCVs = async () => {
      try {
        const response = await axiosInstance.get("/api/cvs/accepted");
        setCvs(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading("");
      }
    };

    fetchAcceptedCVs();
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
          buttonVariant="review"
          url={`/cv-review/${cv.id}`}
        />
      ))}
      {cvs.length === 0 && (
        <div style={{ fontSize: "1.25rem" }}>This section is empty.</div>
      )}
    </div>
  );
};

export default CVToReview;
