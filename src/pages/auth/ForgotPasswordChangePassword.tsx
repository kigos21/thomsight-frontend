import PaddedContainer from "../../components/layout/PaddedContainer";
import AuthContentContainer from "../../components/ui/auth/AuthContentContainer";
import Button from "../../components/ui/Button";
import FormField from "../../components/form/FormField"; // Reusing FormField component

import { IconLock } from "@tabler/icons-react";

import styles from "./ForgotPasswordChangePassword.module.scss";

export default function ForgotPasswordChangePassword() {
  return (
    <PaddedContainer>
      <AuthContentContainer>
        <div className={styles.container}>
          <h1 className={styles.header}>Password Recovery</h1>
          <div className={styles.formContainer}>
            <form className={styles.form}>
              {/* Password Field */}
              <FormField
                icon={
                  <IconLock size={35} stroke={1.5} className={styles.icon} />
                }
                type="password"
                placeholder="Password"
                required
              />

              {/* Confirm Password Field */}
              <FormField
                icon={
                  <IconLock size={35} stroke={1.5} className={styles.icon} />
                }
                type="password"
                placeholder="Confirm Password"
                required
              />
            </form>
            <Button
              color="primary"
              roundness="rounded"
              classNames={styles.button}
            >
              Change Password
            </Button>
          </div>
        </div>
      </AuthContentContainer>
    </PaddedContainer>
  );
}
