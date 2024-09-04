import PaddedContainer from "../../components/layout/PaddedContainer";
import AuthContentContainer from "../../components/ui/auth/AuthContentContainer";
import styles from "./CVGuidePage.module.scss";

export default function CVGuidePage() {
  return (
    <PaddedContainer>
      <AuthContentContainer>
        <div className={styles.container}>
          <h1>Curriculum Vitae Guide</h1>
          <div className={styles.containeritems}>
            <h2>Format</h2>
            <a>
            Font: Century Gothic
            Font size: 11 (14 for Name only)
            Picture: pasted (Formal picture)
            Spacing: Single (Double in between major divisions)
            Pages: 2 (maximum)
            </a>
          </div>
        </div>
      </AuthContentContainer>
    </PaddedContainer>
  );
}
