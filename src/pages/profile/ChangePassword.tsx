import React from "react";
import PaddedContainer from "../../components/layout/PaddedContainer";
import StyledBox from "../../components/layout/StyledBox";
import FormField from "../../components/form/FormField";
import Button from "../../components/ui/Button";
import styles from "./ChangePassword.module.scss";
import { IconLock } from "@tabler/icons-react";

const ChangePassword = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      <StyledBox classNames={styles.styledBox}>
        <h2 className={styles.title}>Change Password</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <FormField
            icon={<IconLock size={35} stroke={1.5} className={styles.icon} />}
            type="password"
            placeholder="Your Password"
            required={true}
          />
          <FormField
            icon={<IconLock size={35} stroke={1.5} className={styles.icon} />}
            type="password"
            placeholder="Your New Password"
            required={true}
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
