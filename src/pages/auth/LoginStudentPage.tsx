import { useState } from "react";
import PaddedContainer from "../../components/layout/PaddedContainer";
import Button from "../../components/ui/Button";
import FormField from "../../components/form/FormField";
import { IconLock, IconMail } from "@tabler/icons-react";
import googleIcon from "../../assets/google-logo.png";
import { handleGoogleLogin } from "../../api/googleLogin";
import axios from "axios";

import styles from "./LoginStudentPage.module.scss";

export default function LoginStudentPage() {
  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie");

      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      console.log("Login successful", response.data);
      window.location.href = "http://localhost:5173/";
    } catch (err) {
      setError("Invalid credentials or server error");
      console.error("Login failed", err);
    }
  };

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie");

      await axios.get("http://localhost:8000/api/logout", {});
      console.log("Logout successful");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <PaddedContainer>
      <div className={styles.container}>
        <h1>Login with your Account</h1>
        <div className={styles.formContainer}>
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
            <a href="/forgot-password">Forgot Password?</a>
            <Button
              color="primary"
              roundness="rounded"
              classNames={styles.button}
              type="submit"
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
