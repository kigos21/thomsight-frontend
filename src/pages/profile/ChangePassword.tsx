import React, { useState } from "react";
import PaddedContainer from "../../components/layout/PaddedContainer";
import StyledBox from "../../components/layout/StyledBox";
import FormField from "../../components/form/FormField";
import Button from "../../components/ui/Button";
import styles from "./ChangePassword.module.scss";
import { IconLock } from "@tabler/icons-react";
import axiosInstance from "../../services/axiosInstance";
import Spinner from "../../components/ui/Spinner";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E])[A-Za-z\d\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      toast.error(
        "Password must be at least 8 characters, include 1 special character, and have both uppercase and lowercase letters."
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      setLoading("Changing your password");
      await axiosInstance.post("/api/change-password-request", {
        old_password: oldPassword,
        new_password: newPassword,
      });
      toast.success("A verification link has been sent to your email.");
    } catch (err: any) {
      toast.error(err.response.data.message);
      console.error(err);
    } finally {
      setLoading("");
    }
  };

  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      <StyledBox classNames={styles.styledBox}>
        <h2 className={styles.title}>Change Password</h2>
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
