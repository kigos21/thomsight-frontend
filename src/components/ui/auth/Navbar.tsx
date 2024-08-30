import logo from "../../../assets/thomsight-logo.svg";
import PaddedContainer from "../../layout/PaddedContainer";
import Button from "../Button";

import styles from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <PaddedContainer style={{ marginBottom: "50px" }}>
      <nav className={styles.container}>
        <h1 className={styles.heading}>Thomsight</h1>
        <img src={logo} alt="Logo" className={styles.logo} />
        <Button
          color="secondary"
          roundness="rounded"
          classNames={styles.button}
        >
          Login
        </Button>
      </nav>
    </PaddedContainer>
  );
}
