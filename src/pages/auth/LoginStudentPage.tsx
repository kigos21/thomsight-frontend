import { useEffect, useState } from "react";
import PaddedContainer from "../../components/layout/PaddedContainer";
import Button from "../../components/ui/Button";
import FormField from "../../components/form/FormField";
import { IconLock, IconMail } from "@tabler/icons-react";
import googleIcon from "../../assets/google-logo.png";
import { handleGoogleLogin } from "../../api/googleLogin";
import { login } from "../../api/authUser";
import Spinner from "../../components/ui/Spinner";

import styles from "./LoginStudentPage.module.scss";
import SuccessMessage from "../../components/form/SuccessMessage";

export default function LoginStudentPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const registrationMessage = localStorage.getItem("registrationSuccess");
    const passwordResetMessage = localStorage.getItem("resetPasswordSuccess");
    if (registrationMessage) {
      setSuccessMessage(registrationMessage);
      localStorage.removeItem("registrationSuccess");
    } else if (passwordResetMessage) {
      setSuccessMessage(passwordResetMessage);
      localStorage.removeItem("resetPasswordSuccess");
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      window.location.href = "http://localhost:5173/companies";
    } catch (err) {
      setError("Invalid credentials");
      console.error("Login failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaddedContainer>
      <div className={styles.container}>
        <h1>Login with your Account</h1>
        <div className={styles.formContainer}>
          {successMessage && <SuccessMessage message={successMessage} />}
          <form className={styles.form} onSubmit={handleLogin}>
            {error && <div className={styles.error}>{error}</div>}
            <FormField
              icon={<IconMail size={35} stroke={1.5} className={styles.icon} />}
              type="email"
              placeholder="Email"
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormField
              icon={<IconLock size={35} stroke={1.5} className={styles.icon} />}
              type="password"
              placeholder="Password"
              required={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a className={styles.forgotPassword} href="/forgot-password">
              Forgot Password?
            </a>
            {loading && <Spinner message="Please wait while we log you in!" />}
            <Button
              color="primary"
              roundness="rounded"
              classNames={styles.button}
              type="submit"
              disabled={loading}
            >
              Login
            </Button>
          </form>
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
