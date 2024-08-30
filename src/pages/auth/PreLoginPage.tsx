import { Link } from "react-router-dom";
import PaddedContainer from "../../components/layout/PaddedContainer";
import AuthContentContainer from "../../components/ui/auth/AuthContentContainer";
import Button from "../../components/ui/Button";

import styles from "./PreLoginPage.module.scss";

export default function PreRegisterPage() {
  return (
    <PaddedContainer classNames={styles.background}>
      <AuthContentContainer>
        <div className={styles.container}>
          <h1 className={styles.h1}>
            Are you a student, alumni, or a company representative?
          </h1>
          <div className={styles.buttonContainer}>
            <Link to={"/login/student"}>
              <Button
                color={"primary"}
                roundness={"rounded"}
                classNames={styles.button}
              >
                Student
              </Button>
            </Link>
            <Link to={"/login/external"}>
              <Button
                color={"primary"}
                roundness={"rounded"}
                classNames={styles.button}
              >
                Alumni
              </Button>
            </Link>
            <Link to={"/login/external"}>
              <Button
                color={"primary"}
                roundness={"rounded"}
                classNames={styles.button}
              >
                Company Representative
              </Button>
            </Link>
          </div>
        </div>
      </AuthContentContainer>
    </PaddedContainer>
  );
}
