import PaddedContainer from "../../components/layout/PaddedContainer";
import Button from "../../components/ui/Button";
import FormField from "../../components/form/FormField";
import { IconKey } from "@tabler/icons-react";

import styles from "./CompanyTokenPage.module.scss";

export default function CompanyTokenPage() {
  return (
    <PaddedContainer>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <form className={styles.form}>
            <FormField
              icon={<IconKey size={35} stroke={1.5} className={styles.icon} />}
              type={"number"}
              placeholder={"Enter Token"}
              required={true}
            />
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
