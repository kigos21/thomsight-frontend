import PaddedContainer from "../components/layout/PaddedContainer";
import StyledBox from "../components/layout/StyledBox";
import styles from "./CVGuidePage.module.scss";
import srcLogo from "../assets/thomsight-logo.svg";

export default function CVGuidePage() {
  return (
    <PaddedContainer>
      <StyledBox classNames={styles.styledbox}>
        <div className={styles.imgContainer}>
          <img src={srcLogo} alt="Thomsight logo" />
        </div>

        <div className={styles.container}>
          <h1 className={styles.title}>Curriculum Vitae Guide</h1>

          {/* Format */}
          <h2 className={styles.subtitle}>Format</h2>
          <div className={styles.items}>
            <a>Font: Century Gothic</a>
            <a>Font size: 11 (14 for Name only)</a>
            <a>Picture: pasted (Formal picture)</a>
            <a>Spacing: Single (Double in between major divisions)</a>
            <a>Pages: 2 (maximum)</a>
          </div>

          {/* Name */}
          <h2 className={styles.subtitle}>Name</h2>
          <div className={styles.items}>
            <a>Address</a>
            <a>Contact Information (Landline no./Cellphone no./E-mail)</a>
            <br />
            <a>Power Statement / Career Obejctive (no heading)</a>
            <div className={styles.subitems}>
              <a>• less than 25 words</a>
              <a>
                • characteristic + position desired + what you can contribute to
                the company
              </a>
              <a>
                • dynamic, honest, committed Thomasian seeking a position in
                your company
              </a>
            </div>
          </div>

          {/* Education */}
          <h2 className={styles.subtitle}>Education</h2>
          <div className={styles.items}>
            <a>University of Santo Tomas (Include Dates)</a>
            <a>Course</a>
            <a>Honors Received (if any)</a>
            <a>Name of School (Include Dates)</a>
            <a>Secondary Education</a>
          </div>

          {/* Extra-Curricular Involvement */}
          <h2 className={styles.subtitle}>Extra-Curricular Involvement</h2>
          <div className={styles.items}>
            <a>Organization</a>
            <a>Position (Include Dates)</a>
            <div className={styles.subitems}>
              <a>• college organizations only</a>
              <a>• may include organizations outside of the university</a>
              <a>• accomplishments in the organization</a>
            </div>
          </div>

          {/* Skills */}
          <h2 className={styles.subtitle}>Skills</h2>
          <div className={styles.items}>
            <a>Bullet Form</a>
            <a>Hard Skills First</a>
            <div className={styles.subitems}>
              <a>• communication skills (written and oral)</a>
              <a>• computer language / technical skills</a>
              <a>• languages</a>
            </div>
            <a>Soft Skills</a>
            <div className={styles.subitems}>
              <a>• teamplayer</a>
              <a>• leadership</a>
            </div>
            <a>
              Use words such as, excellent, above-average, proficient,
              knowledgeable
            </a>
            <a>List skills relevant to the position</a>
          </div>

          {/* Seminars Attended */}
          <h2 className={styles.subtitle}>Education</h2>
          <div className={styles.items}>
            <a>Title, Organization, Institution, Date</a>
          </div>
        </div>
      </StyledBox>
    </PaddedContainer>
  );
}
