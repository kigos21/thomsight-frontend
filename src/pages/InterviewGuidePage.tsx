import React, { useEffect, useState } from "react";
import PaddedContainer from "../components/layout/PaddedContainer";
import StyledBox from "../components/layout/StyledBox";
import styles from "./InterviewGuidePage.module.scss";
import srcLogo from "../assets/thomsight-logo.svg";
import Button from "../components/ui/Button";
import { IconEdit } from "@tabler/icons-react";
import EditTipPopup from "../components/ui/EditTipPopup";
import { useUser } from "../contexts/UserContext";
import axiosInstance from "../services/axiosInstance";
import Spinner from "../components/ui/Spinner";

interface GuideTip {
  header: string;
  details: string;
}

export default function InterviewGuidePage() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [tips, setTips] = useState<GuideTip[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await axiosInstance.get("/api/guide-tips");
        setTips(response.data);
      } catch (error) {
        console.error("Error fetching tips:", error);
      }
    };

    fetchTips();
  }, [isPopupOpen === false]);

  const handleEditClick = () => {
    setPopupOpen(true);
  };

  return (
    <PaddedContainer>
      <StyledBox classNames={styles.styledbox}>
        <div className={styles.imgContainer}>
          <img src={srcLogo} alt="Thomsight logo" />
        </div>

        <div className={styles.container}>
          <h1 className={styles.title}>
            Interview Tips
            {user?.role === "Admin" && (
              <Button
                color="primary"
                roundness="rounded"
                classNames={styles.editButton}
                onClick={handleEditClick}
              >
                <IconEdit
                  size={20}
                  className={styles.iconEdit}
                  style={{ marginRight: "0.5rem" }}
                />
                Edit
              </Button>
            )}
          </h1>
          {tips.length > 0 ? (
            tips.map((tip, index) => (
              <div key={index}>
                <h2 className={styles.subtitle}>
                  {index + 1}. {tip.header}
                </h2>
                <div className={styles.items}>
                  <p>{tip.details}</p>
                </div>
              </div>
            ))
          ) : (
            <Spinner message="Loading tips..." />
          )}
          <div className={styles.videoContainer}>
            <iframe
              src="https://www.youtube.com/embed/HG68Ymazo18?si=hIMpsiVKOO-XScuY"
              title="Interview Tips Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p>
              Video by Indeed on YouTube (used under Creative Commons License).
            </p>
          </div>
        </div>
      </StyledBox>

      <EditTipPopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
    </PaddedContainer>
  );
}
