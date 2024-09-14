import PaddedContainer from "../../components/layout/PaddedContainer";
import Button from "../../components/ui/Button";
import FormField from "../../components/form/FormField";
import { IconLock, IconMail } from "@tabler/icons-react";
import googleIcon from "../../assets/google-logo.png";
import { useEffect } from "react";

import styles from "./LoginStudentPage.module.scss";

export default function LoginStudentPage() {
  const handleGoogleLogin = async () => {
    window.location.href = "http://127.0.0.1:8000/auth/redirect";
  };

  const handleRedirect = async () => {
    const response = await fetch("http://127.0.0.1:8000/auth/callback");
    const data = await response.json();
    if (data.token) {
      localStorage.setItem("authToken", data.token);
      window.location.href = "/company";
    }
  };

  useEffect(() => {
    handleRedirect();
  }, []);

  return (
    <PaddedContainer>
      <div className={styles.container}>
        <h1>Login with your Account</h1>
        <div className={styles.formContainer}>
          <form className={styles.form}>
            <FormField
              icon={<IconMail size={35} stroke={1.5} className={styles.icon} />}
              type="email"
              placeholder="Email"
              required={true}
            />
            <FormField
              icon={<IconLock size={35} stroke={1.5} className={styles.icon} />}
              type="password"
              placeholder="Password"
              required={true}
            />
            <a href="/forgot-password">Forgot Password?</a>
          </form>
          <Button
            color="primary"
            roundness="rounded"
            classNames={styles.button}
          >
            Login
          </Button>
          {/* <div className={styles.hr} /> */}
          <Button
            color="primary"
            roundness="rounded"
            classNames={styles.googleButton}
            onClick={handleGoogleLogin}
          >
            <img src={googleIcon} alt="" className={styles.googleIcon} />
            Login with Google
          </Button>
        </div>
      </div>
    </PaddedContainer>
  );
}
