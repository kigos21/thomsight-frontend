import styles from "./ButtonCV.module.scss";

interface ButtonCVProps {
  children: React.ReactNode;
}

const ButtonCV = ({ children }: ButtonCVProps) => {
  return (
    <button type="button" className={styles.button}>
      {children}
    </button>
  );
};

export default ButtonCV;
