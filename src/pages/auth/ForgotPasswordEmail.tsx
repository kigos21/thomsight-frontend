import PaddedContainer from "../../components/layout/PaddedContainer";
import AuthContentContainer from "../../components/ui/auth/AuthContentContainer";
import Button from "../../components/ui/Button";
import { IconMail } from "@tabler/icons-react";

import styles from "./ForgotPasswordEmail.module.scss";

export default function ForgotPasswordEmail() {
  return (
    <PaddedContainer>
      <AuthContentContainer>
        <div className={styles.container}>
          <h1>Password Recovery</h1>
          <div className={styles.formContainer}>
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <IconMail size={35} stroke={1.5} className={styles.icon} />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className={styles.textField}
                />
              </div>
            </form>
            <Button
              color="primary"
              roundness="rounded"
              classNames={styles.button}
            >
              Verify
            </Button>
          </div>
        </div>
      </AuthContentContainer>
    </PaddedContainer>
  );
}
