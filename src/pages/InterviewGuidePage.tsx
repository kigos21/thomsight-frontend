import { useEffect, useState } from "react";
import PaddedContainer from "../components/layout/PaddedContainer";
import StyledBox from "../components/layout/StyledBox";
import styles from "./InterviewGuidePage.module.scss";
import srcLogo from "../assets/thomsight-logo.svg";
import { IconEdit } from "@tabler/icons-react";
import EditTipPopup from "../components/ui/EditTipPopup";
import { useUser } from "../contexts/UserContext";
import axiosInstance from "../services/axiosInstance";
import Spinner from "../components/ui/Spinner";

export interface GuideTip {
  id: number;
  header: string;
  details: string;
}

export default function InterviewGuidePage() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [tips, setTips] = useState<GuideTip[]>([]);
  const [loading, setLoading] = useState("");
  const { user } = useUser();

  useEffect(() => {
    const fetchTips = async () => {
      setLoading("Loading tips...");
      try {
        const response = await axiosInstance.get("/api/guide-tips");
        setTips(response.data);
      } catch (error) {
        console.error("Error fetching tips:", error);
      } finally {
        setLoading("");
      }
    };

    fetchTips();
  }, []);

  const handleEditClick = () => {
    setPopupOpen(true);
  };

  const handleUpdateTips = (payload: {
    newTips: GuideTip[];
    updatedTips: GuideTip[];
    deletedTips: GuideTip[];
  }) => {
    setTips((prevTips) => {
      const remainingTips = prevTips.filter(
        (tip) =>
          !payload.deletedTips.some((deletedTip) => deletedTip.id === tip.id)
      );

      const tipsWithoutUpdates = remainingTips.filter(
        (tip) =>
          !payload.updatedTips.some((updatedTip) => updatedTip.id === tip.id)
      );

      const updatedTipsList = [
        ...tipsWithoutUpdates,
        ...payload.newTips,
        ...payload.updatedTips,
      ];

      return updatedTipsList.sort((a, b) => a.id - b.id);
    });
  };

  return (
    <PaddedContainer>
      <StyledBox classNames={styles.styledbox}>
        {loading && <Spinner message={loading} />}
        <div className={styles.imgContainer}>
          <img src={srcLogo} alt="Thomsight logo" />
        </div>

        <div className={styles.container}>
          <div className={styles.titleHolder}>
            <h1 className={styles.title}>
              Interview Tips
              {user?.role === "Admin" && (
                <div className={styles.buttonHolder}>
                  {/* <Button
                      color="secondary"
                      roundness="sm-rounded"
                      classNames={styles.editButton}
                      onClick={handleEditClick}
                    > */}
                  <IconEdit
                    size={35}
                    stroke={1.5}
                    className={styles.editIcon}
                    onClick={handleEditClick}
                  />
                  {/* Edit
                    </Button> */}
                </div>
              )}
            </h1>
          </div>
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
            <p> No tips available! </p>
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

      <EditTipPopup
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        handleUpdateTips={handleUpdateTips}
        tips={tips}
      />
    </PaddedContainer>
  );
}
