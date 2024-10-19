import PaddedContainer from "../../components/layout/PaddedContainer";
import AuthContentContainer from "../../components/ui/auth/AuthContentContainer";
import Button from "../../components/ui/Button";
import FormField from "../../components/form/FormField"; // Reusing FormField component

import { IconLock } from "@tabler/icons-react";

import styles from "./ForgotPasswordChangePassword.module.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import ValidationError from "../../components/form/ValidationError";
import SuccessMessage from "../../components/form/SuccessMessage";
import Spinner from "../../components/ui/Spinner";

export default function ForgotPasswordChangePassword() {
  const { token } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setEmail(params.get("email") || "");
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    setError("");
    setPasswordError("");
    setConfirmPasswordError("");

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters, include 1 special character, and have both uppercase and lowercase letters."
      );
      isValid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    if (!isValid) return;

    setLoading("Changing your password...");
    try {
      await axiosInstance.post("/reset-password", {
        token,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      localStorage.setItem(
        "resetPasswordSuccess",
        "Password has been successfully reset"
      );
      navigate("/login/student");
    } catch (err) {
      setError("There was an issue resetting your password." + err);
    } finally {
      setLoading("");
    }
  };

  return (
    <PaddedContainer>
      <AuthContentContainer>
        <div className={styles.container}>
          {loading && <Spinner message={loading} />}
          <h1 className={styles.header}>Password Recovery</h1>
          <div className={styles.formContainer}>
            {error && <ValidationError message={error} />}
            <form className={styles.form} onSubmit={handleSubmit}>
              {/* Password Field */}
              <FormField
                icon={
                  <IconLock size={35} stroke={1.5} className={styles.icon} />
                }
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <ValidationError message={passwordError} />}

              {/* Confirm Password Field */}
              <FormField
                icon={
                  <IconLock size={35} stroke={1.5} className={styles.icon} />
                }
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {confirmPasswordError && (
                <ValidationError message={confirmPasswordError} />
              )}
              <Button
                color="primary"
                roundness="rounded"
                classNames={styles.button}
                type="submit"
              >
                Change Password
              </Button>
            </form>
          </div>
        </div>
      </AuthContentContainer>
    </PaddedContainer>
  );
}
