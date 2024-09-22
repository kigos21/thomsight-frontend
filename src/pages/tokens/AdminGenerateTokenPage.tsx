import { IconPlus } from "@tabler/icons-react";
import PaddedContainer from "../../components/layout/PaddedContainer";
import StyledBox from "../../components/layout/StyledBox";
import Button from "../../components/ui/Button";
import styles from "./AdminGenerateTokenPage.module.scss";
import TokenItem from "../../components/ui/tokens/TokenItem";

export default function AdminGenerateTokenPage() {
  return (
    <PaddedContainer>
      <div className={styles.title}>
        <h1>Tokens</h1>
        <Button classNames={styles.button}>
          <IconPlus /> Generate Token
        </Button>
      </div>

      <StyledBox classNames={styles.styledbox}>
        <div className={styles.companytokens}>
          <div className={styles.header}>
            <p>#</p>
            <p>Token</p>
            <p>Company</p>
          </div>
          <TokenItem number={1} token="X7pL9kFg" />
          <TokenItem number={2} token="X7pL9kFg" />
          <TokenItem number={3} token="X7pL9kFg" />
          <TokenItem number={4} token="X7pL9kFg" />
          <TokenItem number={5} token="X7pL9kFg" />
          <TokenItem number={6} token="X7pL9kFg" />
          <TokenItem number={7} token="X7pL9kFg" />
          <TokenItem number={8} token="X7pL9kFg" />
          <TokenItem number={9} token="X7pL9kFg" />
          <TokenItem number={10} token="X7pL9kFg" />
        </div>
      </StyledBox>
    </PaddedContainer>
  );
}
