import { useEffect, useState } from "react";
import CVCard from "../../components/ui/cv/CVCard";
import styles from "./CVListing.module.scss";
import { CV } from "../../types/types";
import axiosInstance from "../../services/axiosInstance";
import Spinner from "../../components/ui/Spinner";

const CVListing = () => {
  const [cvs, setCvs] = useState<CV[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCVs = async () => {
      try {
        const response = await axiosInstance.get("/api/cvs");
        setCvs(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCVs();
  }, []);

  return (
    <div className={styles.rootContainer}>
      {loading && <Spinner message="Loading CVs..." />}
      {/* <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="request-access"
      />
      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="delete"
      />
      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="request-access"
      />
      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="request-access"
      />
      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="request-access"
      />
      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="request-access"
      /> */}
      {cvs.map((cv) => (
        <CVCard
          key={cv.id}
          name={cv.name}
          fileTitle={cv.file}
          description={cv.description}
          buttonVariant="request-access"
        />
      ))}
    </div>
  );
};

export default CVListing;
