import logo from "../../../assets/thomsight-logo.svg";
import Button from "../Button";

import styles from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <header className={styles.container}>
      <h1 className={styles.heading}>Thomsight</h1>
      <img src={logo} alt="Logo" className={styles.logo} />
      <Button color="secondary" roundness="rounded" classNames={styles.button}>
        Login
      </Button>
    </header>
  );
}
