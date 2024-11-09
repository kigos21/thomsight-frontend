import React, { useState } from "react";
import PaddedContainer from "../../components/layout/PaddedContainer";
import StyledBox from "../../components/layout/StyledBox";
import FormField from "../../components/form/FormField";
import Button from "../../components/ui/Button";
import styles from "./ChangePassword.module.scss";
import { IconLock } from "@tabler/icons-react";
import axiosInstance from "../../services/axiosInstance";
import SuccessMessage from "../../components/form/SuccessMessage";
import ValidationError from "../../components/form/ValidationError";
import Spinner from "../../components/ui/Spinner";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    setError("");
    setSuccess("");
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    try {
      setLoading("Changing your password");
      await axiosInstance.post("/api/change-password-request", {
        old_password: oldPassword,
        new_password: newPassword,
      });
      setSuccess("A verification link has been sent to your email.");
    } catch (err: any) {
      setError(err.response.data.message);
      console.error(err);
    } finally {
      setLoading("");
    }
  };

  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      <StyledBox classNames={styles.styledBox}>
        <h2 className={styles.title}>Change Password</h2>
        {error && <ValidationError message={error} />}
        {success && <SuccessMessage message={success} />}
        {loading && <Spinner message={loading} />}
        <form className={styles.form} onSubmit={handleSubmit}>
          <FormField
            icon={<IconLock size={35} stroke={1.5} className={styles.icon} />}
            type="password"
            placeholder="Your Password"
            required={true}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <FormField
            icon={<IconLock size={35} stroke={1.5} className={styles.icon} />}
            type="password"
            placeholder="Your New Password"
            required={true}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <FormField
            icon={<IconLock size={35} stroke={1.5} className={styles.icon} />}
            type="password"
            placeholder="Confirm New Password"
            required={true}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            color="primary"
            roundness="rounded"
            classNames={styles.button}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </StyledBox>
    </PaddedContainer>
  );
};

export default ChangePassword;
