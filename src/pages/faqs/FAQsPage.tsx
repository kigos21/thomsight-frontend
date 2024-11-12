import PaddedContainer from '../../components/layout/PaddedContainer';
import StyledBox from '../../components/layout/StyledBox';
import styles from './FAQsPage.module.scss';

export default function FAQsPage() {
  return (
    <PaddedContainer>
      <StyledBox classNames={styles.styledbox}>
        <div className={styles.imgContainer}>
          <img src="/src/assets/thomsight-logo.svg" alt="Thomsight logo" />
        </div>
        <div className={styles.container}>
          <h1 className={styles.title}>Frequently Asked Questions</h1>
          <div className={styles.items}>
            <h2 className={styles.subtitle}>1. What is this platform about?</h2>
            <p className={styles.paragraph}>This platform is designed to help the students prepare for interviews and enhance their career prospects.</p>
          </div>
          <div className={styles.items}>
            <h2 className={styles.subtitle}>2. How do I submit my CV for review?</h2>
            <p className={styles.paragraph}>To submit your CV for peer review, navigate to the CV Review section and follow the instructions to upload your document.</p>
          </div>
          <div className={styles.items}>
            <h2 className={styles.subtitle}>3. Who can post job opportunities?</h2>
            <p className={styles.paragraph}>Company representatives can post job opportunities. Ensure that all information provided is accurate and respectful.</p>
          </div>
          <div className={styles.items}>
            <h2 className={styles.subtitle}>4. How can I guide the students as an alumni?</h2>
            <p className={styles.paragraph}>Alumni are encouraged to engage with the community to help the students prepare for interviews and provide them with valuable insights with these specific companies.</p>
          </div>
          <div className={styles.items}>
            <h2 className={styles.subtitle}>5. What should I do if I encounter a technical issue?</h2>
            <p className={styles.paragraph}>If you encounter any technical issues, please contact our support team through their email "thomsight2024@gmail.com" for assistance.</p>
          </div>
          <div className={styles.items}>
            <h2 className={styles.subtitle}>6. How can I be able to post my company in this platform?</h2>
            <p className={styles.paragraph}>If you are a company representative, you can establish a Memorandum of Agreement (MOA) with the adminstrator (TPC) to post your company in this platform.</p>
          </div>
          <div className={styles.items}>
            <h2 className={styles.subtitle}>7. Who are the users of this platform?</h2>
            <p className={styles.paragraph}>The users of this platform are the students, alumni, company representatives, and the adminstrator (TPC).</p>
          </div>
          <div className={styles.items}>
            <h2 className={styles.subtitle}>8. Can I update my profile information?</h2>
            <p className={styles.paragraph}>Yes, you can update your profile information by navigating to the Profile Management section and editing your details.</p>
          </div>
          <div className={styles.items}>
            <h2 className={styles.subtitle}>9. How do I report inappropriate content?</h2>
            <p className={styles.paragraph}>If you encounter inappropriate content, please report it using the report button available on the post.</p>
          </div>
          <div className={styles.items}>
            <h2 className={styles.subtitle}>10. Is this platform accessible to all students of University of Santo Tomas?</h2>
            <p className={styles.paragraph}>No, this platform is only accessible to specifically the College of Information and Computing Sciences (CICS) students along with the alumni of the same university and of course the company representatives and the adminstrator.</p>
          </div>
        </div>
      </StyledBox>
    </PaddedContainer>
  );
}
