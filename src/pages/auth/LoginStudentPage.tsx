import { useEffect, useState } from "react";
import PaddedContainer from "../../components/layout/PaddedContainer";
import Button from "../../components/ui/Button";
import FormField from "../../components/form/FormField";
import { IconLock, IconMail } from "@tabler/icons-react";
import googleIcon from "../../assets/google-logo.png";
import { login } from "../../api/authUser";
import Spinner from "../../components/ui/Spinner";

import styles from "./LoginStudentPage.module.scss";
import SuccessMessage from "../../components/form/SuccessMessage";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginStudentPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const verified = params.get("verified");
    const changed = params.get("changed");
    const registrationMessage = localStorage.getItem("registrationSuccess");
    const passwordResetMessage = localStorage.getItem("resetPasswordSuccess");
    if (verified === "1") {
      setSuccessMessage(
        "Your email has been successfully verified! You can now log in."
      );
    }
    if (changed === "1") {
      setSuccessMessage("Your password has been changed successfully.");
    }
    if (registrationMessage) {
      setSuccessMessage(registrationMessage);
      localStorage.removeItem("registrationSuccess");
    }
    if (passwordResetMessage) {
      setSuccessMessage(passwordResetMessage);
      localStorage.removeItem("resetPasswordSuccess");
    }
  }, [location]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setSuccessMessage("");

    try {
      await login(email, password);
      navigate("/companies");
    } catch (err: any) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    console.log("Google Log In");
    // window.location.href = "http://localhost:8000/auth/google";
    window.location.href = "https://api.thomsight.com/auth/google";
    // navigate("/companies");
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
          <p className={styles.googleHeader}>
            <span>Are you a student? Use Google to log in.</span>
          </p>

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
