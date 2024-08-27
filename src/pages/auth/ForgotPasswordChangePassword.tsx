import PaddedContainer from "../../components/layout/PaddedContainer";
import AuthContentContainer from "../../components/ui/auth/AuthContentContainer";
import Button from "../../components/ui/Button";
import { IconLock } from "@tabler/icons-react";

import styles from "./ForgotPasswordChangePassword.module.scss";

export default function ForgotPasswordChangePassword() {
  return (
    <PaddedContainer>
      <AuthContentContainer>
        <div className={styles.container}>
          <h1>Password Recovery</h1>
          <div className={styles.formContainer}>
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <IconLock size={35} stroke={1.5} className={styles.icon} />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  className={styles.textField}
                />
              </div>
              <div className={styles.formGroup}>
                <IconLock size={35} stroke={1.5} className={styles.icon} />
                <input
                  type="password"
                  placeholder="Confirm Password"
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
              Change Password
            </Button>
          </div>
        </div>
      </AuthContentContainer>
    </PaddedContainer>
  );
}
