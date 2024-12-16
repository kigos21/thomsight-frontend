import PaddedContainer from "../../components/layout/PaddedContainer";
import AuthContentContainer from "../../components/ui/auth/AuthContentContainer";
import Button from "../../components/ui/Button";
import FormField from "../../components/form/FormField"; // Reusing FormField component

import { IconLock } from "@tabler/icons-react";

import styles from "./ForgotPasswordChangePassword.module.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import Spinner from "../../components/ui/Spinner";
import { toast } from "react-toastify";

export default function ForgotPasswordChangePassword() {
  const { token } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setEmail(params.get("email") || "");
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E])[A-Za-z\d\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]{8,}$/;
    const allowedSpecialChars = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

    if (!passwordRegex.test(password)) {
      toast.error(
        `Password must be at least 8 characters, include at least 1 special character (${allowedSpecialChars}), and have both uppercase and lowercase letters.`
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

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
      navigate("/login");
    } catch (err) {
      toast.error("There was an issue resetting your password.");
      console.error(err);
    } finally {
      setLoading("");
    }
  };

  return (
    <PaddedContainer>
      <AuthContentContainer ableBoxShadow={true}>
        <div className={styles.container}>
          {loading && <Spinner message={loading} />}
          <h1 className={styles.header}>Password Recovery</h1>
          <div className={styles.formContainer}>
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
              <Button
                color="secondary"
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
