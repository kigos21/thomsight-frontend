import { useEffect, useState } from "react";
import CVCard from "../../components/ui/cv/CVCard";
import styles from "./CVListing.module.scss";
import { CV } from "../../types/types";
import axiosInstance from "../../services/axiosInstance";
import Spinner from "../../components/ui/Spinner";
import { toast } from "react-toastify";

const CVListing = () => {
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
    try {
      setLoading("Requesting access...");
      await axiosInstance.post(`/api/cv/${cvId}/request-access`);
      toast.success("Your request has been submitted.");
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading("");
    }
  };

  const handleDeleteCV = async (cvId: number) => {
    try {
      setLoading("Deleting CV...");
      const response = await axiosInstance.delete(`/api/cv/${cvId}/delete`);
      console.log(response);
      setCvs((prevCvs) => prevCvs.filter((cv) => cv.id !== cvId));
      toast.success("CV deleted successfully.");
    } catch (error: any) {
      toast.error("Failed to delete CV.");
      console.error(error);
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
          buttonVariant={cv.mine ? "delete" : "request-access"}
          onButtonClick={() =>
            cv.mine ? handleDeleteCV(cv.id) : handleRequestAccess(cv.id)
          }
        />
      ))}
    </div>
  );
};

export default CVListing;
