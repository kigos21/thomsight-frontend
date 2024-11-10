import styles from "./ButtonReview.module.scss";

interface ButtonReviewProps {
  children: React.ReactNode;
  classNames?: string; // Add classNames to the props
  onClick?: () => void;
}

const ButtonReview = ({ children, classNames, onClick }: ButtonReviewProps) => {
  return (
    <button
      type="button"
      className={`${styles.button} ${classNames}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonReview;
