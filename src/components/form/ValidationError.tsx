import { IconAlertCircle } from "@tabler/icons-react";
import styles from "./ValidationError.module.scss";

interface ValidationErrorProps {
  message: string;
}

const ValidationError: React.FC<ValidationErrorProps> = ({ message }) => {
  return (
    <div className={styles.errorMessage}>
      <IconAlertCircle stroke={1.5} size={20} className={styles.errorIcon} />
      <p>{message}</p>
    </div>
  );
};

export default ValidationError;
