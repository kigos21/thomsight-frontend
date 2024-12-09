import { Link } from "react-router-dom";
import PaddedContainer from "../../components/layout/PaddedContainer";
import AuthContentContainer from "../../components/ui/auth/AuthContentContainer";
import Button from "../../components/ui/Button";

import styles from "./PreRegister.module.scss";

export default function PreRegisterPage() {
  return (
    <PaddedContainer classNames={styles.background}>
      <AuthContentContainer>
        <div className={styles.container}>
          <h1 className={styles.h1}>Are you a student or an alumni?</h1>
          <div className={styles.buttonContainer}>
            <Link to={"/register/student"}>
              <Button
                color={"secondary"}
                roundness={"rounded"}
                classNames={styles.button}
              >
                Student
              </Button>
            </Link>
            <Link to={"/register/alumni"}>
              <Button
                color={"secondary"}
                roundness={"rounded"}
                classNames={styles.button}
              >
                Alumni
              </Button>
            </Link>
          </div>
        </div>
      </AuthContentContainer>
    </PaddedContainer>
  );
}
