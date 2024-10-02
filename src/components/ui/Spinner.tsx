import React from "react";
import styles from "./Spinner.module.scss";

interface SpinnerProps {
  message?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ message }) => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinnerBox}>
        <div className={styles.spinner}></div>
        {message && <div className={styles.message}>{message}</div>}
      </div>
    </div>
  );
};

export default Spinner;
