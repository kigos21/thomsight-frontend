import PaddedContainer from "../../components/layout/PaddedContainer";
import InterviewTipsItem from "../../components/ui/company/InterviewTipsItem";
import styles from "./UserCompanyInterviewTips.module.scss";
import { useUser } from "../../contexts/UserContext";
import { useEffect, useState } from "react";
import SuccessMessage from "../../components/form/SuccessMessage";

import Button from "../../components/ui/Button";

export default function UserCompanyInterviewTips() {
  const { user } = useUser();
  const [isAddingReview, setIsAddingTips] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");

  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      <div className={styles.tipHeaderContainer}>
        <h2>Interview Tips</h2>
        {user?.role === "Alumni" && (
          <Button
            color="primary"
            roundness="rounded"
            classNames={styles.replyButton}
            onClick={() => {
              setIsAddingTips(true);
              setSuccess("");
            }}
          >
            Add Tip
          </Button>
        )}
      </div>
      <div className={styles.informationContainer}>
        <p>
          Welcome to the Interview Tips and Guidance Page. Here, you'll find
          valuable insights and practical advice from former interns and
          industry professionals to help you excel in your interviews. Explore
          comprehensive strategies and best practices to enhance your
          preparation and boost your confidence.
        </p>
      </div>
      <div className={styles.boxContainer}>
        <InterviewTipsItem
          subjectHeading="Good Experience"
          internName="John Doe"
          tipDescription="i love the experience i love the experience i love the experience i love the experience i love the experience"
        ></InterviewTipsItem>
      </div>
    </PaddedContainer>
  );
}
