import styles from "./ButtonReview.module.scss";

interface ButtonReviewProps {
  children: React.ReactNode;
  classNames?: string; // Add classNames to the props
}

const ButtonReview = ({ children, classNames }: ButtonReviewProps) => {
  return (
    <button type="button" className={`${styles.button} ${classNames}`}>
      {children}
    </button>
  );
};

export default ButtonReview;
