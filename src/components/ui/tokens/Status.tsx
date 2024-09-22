import React from "react";
import styles from "./Status.module.scss";
import { StatusProps } from "../../../types/props";

const Status: React.FC<StatusProps> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case "active":
        return styles.green;
      case "expiring":
        return styles.yellow;
      case "inactive":
        return styles.red;
      default:
        return "";
    }
  };

  return (
    <div className={styles.statusContainer}>
      <span className={`${styles.circle} ${getStatusColor()}`}></span>
      <span className={styles.statusText}>{status}</span>
    </div>
  );
};

export default Status;
