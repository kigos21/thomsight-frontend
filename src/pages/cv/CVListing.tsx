import { useEffect, useState } from "react";
import CVCard from "../../components/ui/cv/CVCard";
import styles from "./CVListing.module.scss";
import { CV } from "../../types/types";
import axiosInstance from "../../services/axiosInstance";
import Spinner from "../../components/ui/Spinner";
import { toast } from "react-toastify";
import DeletePopUp from "../../components/ui/company/DeletePopUp";

const CVListing = () => {
  const [cvs, setCvs] = useState<CV[]>([]);
  const [loading, setLoading] = useState<string>("Fetching CVs...");
  const [isDeletePopupVisible, setDeletePopupVisible] = useState(false);
  const [cvToDelete, setCvToDelete] = useState<number | null>(null);

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

  const confirmDeleteCV = (cvId: number) => {
    setCvToDelete(cvId);
    setDeletePopupVisible(true);
  };

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

  const handleDeleteCV = async () => {
    if (cvToDelete === null) return;
    try {
      setLoading("Deleting CV...");
      const response = await axiosInstance.delete(
        `/api/cv/${cvToDelete}/delete`
      );
      console.log(response);
      setCvs((prevCvs) => prevCvs.filter((cv) => cv.id !== cvToDelete));
      toast.success("CV deleted successfully.");
    } catch (error: any) {
      toast.error("Failed to delete CV.");
      console.error(error);
    } finally {
      setLoading("");
      setDeletePopupVisible(false);
      setCvToDelete(null);
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
            cv.mine ? confirmDeleteCV(cv.id) : handleRequestAccess(cv.id)
          }
        />
      ))}
      <DeletePopUp
        isVisible={isDeletePopupVisible}
        onClose={() => setDeletePopupVisible(false)}
        onDelete={handleDeleteCV}
        heading="Delete CV"
        details="Are you sure you want to delete this CV?"
      />
    </div>
  );
};

export default CVListing;
