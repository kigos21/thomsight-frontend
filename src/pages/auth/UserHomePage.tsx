import PaddedContainer from "../../components/layout/PaddedContainer";
import CompanyLayout from "../../components/layout/CompanyLayout";
import StyledBox from "../../components/layout/StyledBox";
import styles from "./UserHomePage.module.scss";

export default function UserHomePage() {
  return (
    <PaddedContainer>
      <StyledBox classNames={styles.styledBox}>
        <h1 className={styles.sample}>This is the home page</h1>
      </StyledBox>
    </PaddedContainer>
  );
}
