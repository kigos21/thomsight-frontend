import PaddedContainer from "../../components/layout/PaddedContainer";
import Button from "../../components/ui/Button";
import { IconKey } from "@tabler/icons-react";

import styles from "./CompanyTokenPage.module.scss";

export default function CompanyTokenPage() {
  return (
    <PaddedContainer>
      <div className={styles.container}>
        <h1>Password Recovery</h1>
        <div className={styles.formContainer}>
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <IconKey size={35} stroke={1.5} className={styles.icon} />
              <input
                type="number"
                placeholder="Enter Token"
                required
                className={styles.textField}
              />
            </div>
          </form>
          <Button
            color="primary"
            roundness="rounded"
            classNames={styles.button}
          >
            Validate
          </Button>
        </div>
      </div>
    </PaddedContainer>
  );
}
