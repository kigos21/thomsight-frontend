import PaddedContainer from "../../components/layout/PaddedContainer";
import StyledBox from "../../components/layout/StyledBox";

import styles from "./UserHomePage.module.scss";

export default function UserHomePage() {
  return (
    <PaddedContainer>
      <div className={styles.container}>
        <StyledBox classNames={styles.styledBox}>
          <h1 className={styles.sample}>This is the home page</h1>
        </StyledBox>
      </div>
    </PaddedContainer>
  );
}
