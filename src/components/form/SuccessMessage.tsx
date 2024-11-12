import styles from "./SuccessMessage.module.scss";
import { IconCheck } from "@tabler/icons-react";

interface SuccessMessageProps {
  message?: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => {
  return (
    <div className={styles.successMessage}>
      <IconCheck stroke={1.5} size={20} className={styles.successIcon} />
      <p>{message}</p>
    </div>
  );
};

export default SuccessMessage;
