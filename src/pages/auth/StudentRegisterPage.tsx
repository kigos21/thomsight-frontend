import PaddedContainer from "../../components/layout/PaddedContainer";
import AuthContentContainer from "../../components/ui/auth/AuthContentContainer";
import Button from "../../components/ui/Button";

import { IconLock, IconMail, IconPhone } from "@tabler/icons-react";

import styles from "./StudentRegisterPage.module.scss";
import { Link } from "react-router-dom";

export default function StudentRegisterPage() {
  return (
    <PaddedContainer>
      <AuthContentContainer>
        <div className={styles.container}>
          <h1>Register your Account</h1>
          <div className={styles.formContainer}>
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <IconMail size={35} stroke={1.5} className={styles.icon} />
                <input
                  type="email"
                  placeholder="Email (cics@ust.edu.ph)"
                  className={styles.textField}
                />
              </div>
              <div className={styles.formGroup}>
                <IconLock size={35} stroke={1.5} className={styles.icon} />
                <input
                  type="password"
                  placeholder="Password"
                  className={styles.textField}
                />
              </div>
              <div className={styles.formGroup}>
                <IconLock size={35} stroke={1.5} className={styles.icon} />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className={styles.textField}
                />
              </div>
              <div className={styles.formGroup}>
                <IconPhone size={35} stroke={1.5} className={styles.icon} />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className={styles.textField}
                />
              </div>
              <div className={styles.checkGroup}>
                <input type="checkbox" id="terms" />
                <label htmlFor="terms">
                  I have read and agree to the website{" "}
                  <Link to={"#"}>terms & conditions</Link>
                </label>
              </div>
              <div className={styles.checkGroup}>
                <input type="checkbox" id="privacy" />
                <label htmlFor="privacy">
                  By ticking this box, I agree that I have read the{" "}
                  <Link to={"#"}>data privacy policy</Link>
                </label>
              </div>
            </form>
            <Button
              color="primary"
              roundness="rounded"
              classNames={styles.button}
            >
              Create Account
            </Button>
          </div>
        </div>
      </AuthContentContainer>
    </PaddedContainer>
  );
}
