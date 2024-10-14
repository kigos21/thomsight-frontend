import { IconLock, IconMail } from "@tabler/icons-react";
import FormField from "../../components/form/FormField";
import PaddedContainer from "../../components/layout/PaddedContainer";

import styles from "./LoginExternalPage.module.scss";
import Button from "../../components/ui/Button";

const LoginExternalPage = () => {
  return (
    <PaddedContainer>
      <div className={styles.container}>
        <h1 className={styles.header}>Login with your Account</h1>
        <div className={styles.formContainer}>
          <form className={styles.form}>
            <FormField
              icon={<IconMail size={35} stroke={1.5} className={styles.icon} />}
              type="email"
              placeholder="Email"
              required={true}
            />
            <FormField
              icon={<IconLock size={35} stroke={1.5} className={styles.icon} />}
              type="password"
              placeholder="Password"
              required={true}
            />
            <a className={styles.forgotPassword} href="/forgot-password">
              Forgot Password?
            </a>
            <Button
              color="primary"
              roundness="rounded"
              classNames={styles.button}
              type="submit"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </PaddedContainer>
  );
};

export default LoginExternalPage;
