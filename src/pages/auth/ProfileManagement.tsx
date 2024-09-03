import PaddedContainer from "../../components/layout/PaddedContainer";
import Button from "../../components/ui/Button";
import StyledBox from "../../components/layout/StyledBox";

import styles from "./ProfileManagement.module.scss";

export default function ProfileManagement() {
  return (
    <PaddedContainer>
      <StyledBox classNames={styles.styledBox}>
        <div className={styles.container}>
          <h2>Profile Management tab</h2>
          <Button
            color="primary"
            roundness="rounded"
            classNames={styles.button}
          >
            Save
          </Button>
        </div>
      </StyledBox>
    </PaddedContainer>
  );
}
