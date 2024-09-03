import PaddedContainer from "../../components/layout/PaddedContainer";
import InterviewTipsItem from "../../components/ui/InterviewTipsItem";
import styles from "./UserCompanyInterviewTips.module.scss";

export default function UserCompanyInterviewTips() {
  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      <h2>Interview Tips</h2>
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
