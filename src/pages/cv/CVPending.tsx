import styles from "./CVPending.module.scss";

import CVCard from "../../components/ui/cv/CVCard";
import { useEffect, useState } from "react";
import { CV } from "../../types/types";
import axiosInstance from "../../services/axiosInstance";
import Spinner from "../../components/ui/Spinner";
import { toast } from "react-toastify";

const CVPending = () => {
  const [cvs, setCvs] = useState<CV[]>([]);
  const [loading, setLoading] = useState<string>("Fetching CVs...");

  useEffect(() => {
    const fetchPendingCVs = async () => {
      try {
        const response = await axiosInstance.get("/api/cvs/pending");
        setCvs(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading("");
      }
    };

    fetchPendingCVs();
  }, []);

  const acceptRequest = async (id: number) => {
    try {
      setLoading("Accepting request...");
      const response = await axiosInstance.post(`/api/cv/${id}/accept`);
      if (response.data.success) {
        toast.success("Request accepted successfully.");
        setCvs(cvs.filter((cv) => cv.id !== id));
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to accept request. Please try again later.");
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
          buttonVariant="accept-request"
          onButtonClick={() => acceptRequest(cv.id)}
        />
      ))}
      {cvs.length === 0 && !loading && (
        <div style={{ fontSize: "1.25rem" }}>
          No pending requests available.
        </div>
      )}
    </div>
  );
};

export default CVPending;
