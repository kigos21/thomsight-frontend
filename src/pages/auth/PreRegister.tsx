import PaddedContainer from "../../components/layout/PaddedContainer";
import StyledBox from "../../components/layout/StyledBox";
import Button from "../../components/ui/Button";

import styles from "./PreRegister.module.scss";

export default function PreRegisterPage() {
  return (
    <PaddedContainer classNames={styles.background}>
      <StyledBox
        bgColor="var(--white)"
        border="3px solid var(--muted-black)"
        style={{
          marginTop: "50px",
          maxWidth: "1024px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div className={styles.container}>
          <h1>Are you a student or an alumni?</h1>
          <div className={styles.buttonContainer}>
            <Button
              color={"primary"}
              roundness={"rounded"}
              classNames={styles.button}
            >
              Student
            </Button>
            <Button
              color={"primary"}
              roundness={"rounded"}
              classNames={styles.button}
            >
              Alumni
            </Button>
          </div>
        </div>
      </StyledBox>
    </PaddedContainer>
  );
}
