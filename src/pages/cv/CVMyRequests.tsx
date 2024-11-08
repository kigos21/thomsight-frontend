import styles from "./CVMyRequests.module.scss";

import CVCard from "../../components/ui/cv/CVCard";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { CV } from "../../types/types";
import Spinner from "../../components/ui/Spinner";

const CVMyRequests = () => {
  const [requestedCVs, setRequestedCVs] = useState<CV[]>([]);
  const [reviewedCVs, setReviewedCVs] = useState<CV[]>([]);
  const [loading, setLoading] = useState<string>("Fetching CVs...");

  useEffect(() => {
    const fetchCVs = async () => {
      try {
        const requestedResponse = await axiosInstance.get("/api/requested-cvs");
        setRequestedCVs(requestedResponse.data);
        const reviewedResponse = await axiosInstance.get("/api/reviewed-cvs");
        console.log(reviewedResponse);
        setReviewedCVs(reviewedResponse.data);
      } catch (error) {
        console.error("Error fetching CVs:", error);
      } finally {
        setLoading("");
      }
    };

    fetchCVs();
  }, []);

  return (
    <div className={styles.rootContainer}>
      {loading && <Spinner message={loading} />}
      {requestedCVs.map((cv) => (
        <CVCard
          key={cv.id}
          name={cv.name}
          fileTitle={cv.file}
          description={cv.description}
          buttonVariant="cancel"
          onButtonClick={() => console.log(`Cancel request for ${cv.file}`)}
        />
      ))}
      {reviewedCVs.map((cv) => (
        <CVCard
          key={cv.id}
          name={cv.name}
          fileTitle={cv.file}
          description={cv.description}
          buttonVariant="view-feedback"
          url={`/cv-review/view/${cv.id}`}
        />
      ))}
      {/* <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="cancel"
        onButtonClick={() => console.log("Cancel my request")}
      />

      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="view-feedback"
        url={"/cv-review/view/1"}
      />

      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="cancel"
        onButtonClick={() => console.log("Cancel my request")}
      />

      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="view-feedback"
        url={"/cv-review/view/1"}
      />

      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="cancel"
        onButtonClick={() => console.log("Cancel my request")}
      />

      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="view-feedback"
        url={"/cv-review/view/1"}
      />

      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="cancel"
        onButtonClick={() => console.log("Cancel my request")}
      />

      <CVCard
        name={"Jair T. Tongol"}
        fileTitle={"jair-cv-2024.pdf"}
        description={
          "Help me review my CV guys, I am applying for a Junior Developer position"
        }
        buttonVariant="view-feedback"
        url={"/cv-review/view/1"}
      /> */}
    </div>
  );
};

export default CVMyRequests;
