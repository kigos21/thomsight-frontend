import PaddedContainer from "../components/layout/PaddedContainer";
import StyledBox from "../components/layout/StyledBox";
import styles from "./InterviewGuidePage.module.scss";
import srcLogo from "../assets/thomsight-logo.svg";
import Button from "../components/ui/Button";
import { IconEdit } from "@tabler/icons-react";

export default function InterviewGuidePage() {
  return (
    <PaddedContainer>
      <StyledBox classNames={styles.styledbox}>
        <div className={styles.imgContainer}>
          <img src={srcLogo} alt="Thomsight logo" />
        </div>

        <div className={styles.container}>
          <h1 className={styles.title}>
            Interview Tips
            <Button
              color="primary"
              roundness="rounded"
              classNames={styles.editButton}
              onClick={() => {
        
              }}
            >
              <IconEdit size={20} className={styles.iconEdit} style={{ marginRight: '0.5rem' }} />
              Edit
            </Button>
          </h1>
          {/* #1 */}
          <h2 className={styles.subtitle}>
            1. Prepare for the day of the interview
          </h2>
          <div className={styles.items}>
            <p>
              If you're going to have a successful internship interview, you
              must be prepared for the full day of your interview. You'll need
              to select attire that matches the dress code provided by the
              employer. Additionally, you'll want to ensure that you have
              questions to ask the hiring manager to prove that you've studied
              the position.
            </p>
          </div>
          {/* #2 */}
          <h2 className={styles.subtitle}>
            2. Establish a rapport with the hiring manager
          </h2>
          <div className={styles.items}>
            <p>
              When you first enter the interview room, you want to have a
              positive impact on the hiring manager. It's important to be
              authentic with your approach, but also be cognizant of your
              nonverbal gestures. A hiring manager can easily get a good
              impression with a solid handshake and direct eye contact. A
              relaxed tone of voice also goes a long way in having a successful
              interview.
            </p>
          </div>
          {/* #3 */}
          <h2 className={styles.subtitle}>
            3. Highlight relevant skills and milestones that apply to the
            position
          </h2>
          <div className={styles.items}>
            <p>
              Make a list of your accomplishments before your interview. Your
              accomplishments differentiate you from others interviewing for the
              same role, so you want to make it clear about the impact you've
              had on other organizations. You should convey how your
              accomplishments can be applied to their company.
            </p>
          </div>
          {/* #4 */}
          <h2 className={styles.subtitle}>
            4. Prepare for behavioral interview questions
          </h2>
          <div className={styles.items}>
            <p>
              Behavior interview questions contain a hypothetical scenario from
              the interviewer for you to answer. This is a test of your
              problem-solving skills. Your ability to solve problems shows if
              you're qualified to handle unexpected problems on the job. Study
              the most impactful experiences of your career leading up to the
              interview to answer these questions effectively.
            </p>
          </div>
          {/* #5 */}
          <h2 className={styles.subtitle}>
            5. Make sure that you have a complete understanding of the question
          </h2>
          <div className={styles.items}>
            <p>
              You need to get a clear understanding of the interview question
              before answering it. The quality of your answer can be dictated by
              your listening skills and how measured your response is to that
              question.
            </p>
          </div>
          {/* #6 */}
          <h2 className={styles.subtitle}>
            6. Shorten your responses unless asked to elaborate
          </h2>
          <div className={styles.items}>
            <p>
              You want to evaluate the flow of the conversation you have with
              the interviewer. The interview is going to have a list of
              questions for you to answer. If they're going quickly, then you'll
              want to keep your answers short to accommodate them and show
              courtesy of the interview process.
            </p>
          </div>
          {/* #7 */}
          <h2 className={styles.subtitle}>7. Stay positive</h2>
          <div className={styles.items}>
            <p>
              If you're going to have a successful internship interview, you
              must be prepared for the full day of your interview. You'll need
              to select attire that matches the dress code provided by the
              employer. Additionally, you'll want to ensure that you have
              questions to ask the hiring manager to prove that you've studied
              the position.
            </p>
          </div>
          {/* #8 */}
          <h2 className={styles.subtitle}>
            8. Bring a physical portfolio of past work
          </h2>
          <div className={styles.items}>
            <p>
              You should bring a physical portfolio of your work to show to your
              employer, especially if you apply for a creative internship. You
              can show classroom assignments, proof of volunteer opportunities
              and other assignments that can separate you from the rest of the
              competition. Explain the value of each experience and portray what
              you learned from it.
            </p>
          </div>
          {/* #9 */}
          <h2 className={styles.subtitle}>9. Maintain your confidence</h2>
          <div className={styles.items}>
            <p>
              The amount of confidence you display is a testament to your
              adaptability to workplace situations. Your actions influence the
              actions of the interviewer, but preparation builds your confidence
              while knowing the expectations on the day of the interview.
            </p>
          </div>
          {/* #10 */}
          <h2 className={styles.subtitle}>
            10. Send a thank you note following the interview
          </h2>
          <div className={styles.items}>
            <p>
              Remember to send a thank you note 24 to 48 hours after you speak
              with the hiring manager. Make sure that you reiterate your
              interest in the role and what you learned from the content of
              their responses to the questions you asked them.
            </p>
          </div>
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
    </PaddedContainer>
  );
}
