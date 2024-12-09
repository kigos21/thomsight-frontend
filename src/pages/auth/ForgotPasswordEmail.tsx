import PaddedContainer from "../../components/layout/PaddedContainer";
import AuthContentContainer from "../../components/ui/auth/AuthContentContainer";
import Button from "../../components/ui/Button";
import FormField from "../../components/form/FormField";
import { IconMail } from "@tabler/icons-react";

import styles from "./ForgotPasswordEmail.module.scss";
import axiosInstance from "../../services/axiosInstance";
import { useState } from "react";
import Spinner from "../../components/ui/Spinner";
import { toast } from "react-toastify";

export default function ForgotPasswordEmail() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading("Sending email...");
      await axiosInstance.get("/sanctum/csrf-cookie");
      await axiosInstance.post("/forgot-password", {
        email,
      });
      toast.success("Password reset link has been sent to your email");
    } catch (err) {
      toast.error("Email does not exist");
      console.log(err);
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
                color="secondary"
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
