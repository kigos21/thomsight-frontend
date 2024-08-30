import PaddedContainer from "../../components/layout/PaddedContainer";
import AuthContentContainer from "../../components/ui/auth/AuthContentContainer";
import Button from "../../components/ui/Button";
import FormField from "../../components/form/FormField";
import CheckboxWithLabel from "../../components/form/CheckboxWIthLabel";
import { IconLock, IconMail, IconPhone } from "@tabler/icons-react";

import styles from "./RegisterStudentPage.module.scss";

export default function StudentRegisterPage() {
  return (
    <PaddedContainer>
      <AuthContentContainer>
        <div className={styles.container}>
          <h1>Register your Account</h1>
          <div className={styles.formContainer}>
            <form className={styles.form}>
              <FormField
                icon={
                  <IconMail size={35} stroke={1.5} className={styles.icon} />
                }
                type="email"
                placeholder="Email (cics@ust.edu.ph)"
                required={true}
              />
              <FormField
                icon={
                  <IconLock size={35} stroke={1.5} className={styles.icon} />
                }
                type="password"
                placeholder="Password"
                required={true}
              />
              <FormField
                icon={
                  <IconLock size={35} stroke={1.5} className={styles.icon} />
                }
                type="password"
                placeholder="Confirm Password"
                required={true}
              />
              <FormField
                icon={
                  <IconPhone size={35} stroke={1.5} className={styles.icon} />
                }
                type="tel"
                placeholder="Phone Number"
                required={true}
              />
              <CheckboxWithLabel
                id="terms"
                label="I have read and agree to the website"
                linkText="terms & conditions"
                linkHref="#"
                required={true}
              />
              <CheckboxWithLabel
                id="privacy"
                label="By ticking this box, I agree that I have read the"
                linkText="data privacy policy"
                linkHref="#"
                required={true}
              />
            </form>
            <Button
              color="primary"
              roundness="rounded"
              classNames={styles.button}
            >
              Create Account
            </Button>
          </div>
        </div>
      </AuthContentContainer>
    </PaddedContainer>
  );
}
