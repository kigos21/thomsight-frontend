import PaddedContainer from "../../components/layout/PaddedContainer";
import InterviewTipsItem from "../../components/ui/company/InterviewTipsItem";
import styles from "./UserCompanyInterviewTips.module.scss";

export default function UserCompanyInterviewTips() {
  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      <h2>Interview Tips</h2>
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
