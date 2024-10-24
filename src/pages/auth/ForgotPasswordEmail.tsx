import PaddedContainer from "../../components/layout/PaddedContainer";
import AuthContentContainer from "../../components/ui/auth/AuthContentContainer";
import Button from "../../components/ui/Button";
import FormField from "../../components/form/FormField";
import { IconMail } from "@tabler/icons-react";

import styles from "./ForgotPasswordEmail.module.scss";
import axiosInstance from "../../services/axiosInstance";
import { useState } from "react";
import ValidationError from "../../components/form/ValidationError";
import SuccessMessage from "../../components/form/SuccessMessage";
import Spinner from "../../components/ui/Spinner";

export default function ForgotPasswordEmail() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading("Sending email...");
      await axiosInstance.get("/sanctum/csrf-cookie");
      await axiosInstance.post("/forgot-password", {
        email,
      });
      setSuccess("Password reset link has been sent to your email");
    } catch (err) {
      setError("Email does not exist");
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
            {success && <SuccessMessage message={success} />}
            {error && <ValidationError message={error} />}
            <form className={styles.form} onSubmit={handleSubmit}>
              <FormField
                icon={
                  <IconMail size={35} stroke={1.5} className={styles.icon} />
                }
                type={"email"}
                placeholder={"Email"}
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                color="primary"
                roundness="rounded"
                classNames={styles.button}
                type="submit"
              >
                Verify
              </Button>
            </form>
          </div>
        </div>
      </AuthContentContainer>
    </PaddedContainer>
  );
}
