import { Link } from "react-router-dom";
import styles from "./ButtonCV.module.scss";

export type ButtonVariant =
  | "request-access"
  | "delete"
  | "accept-request"
  | "review"
  | "submitted"
  | "cancel"
  | "view-feedback";

interface ButtonCVProps {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  url?: string;
  onButtonClick?: () => void;
}

const ButtonCV = ({ variant, url, onButtonClick }: ButtonCVProps) => {
  let variantClassname: string;
  let buttonText: string;

  switch (variant) {
    case "request-access":
      variantClassname = styles.requestAccess;
      buttonText = "Request Access";
      break;

    case "delete":
      variantClassname = styles.delete;
      buttonText = "Delete Post";
      break;

    case "accept-request":
      variantClassname = styles.acceptRequest;
      buttonText = "Accept CV Request";
      break;

    case "review":
      variantClassname = styles.review;
      buttonText = "Review";
      break;

    case "submitted":
      variantClassname = styles.submitted;
      buttonText = "Submitted";
      break;

    case "cancel":
      variantClassname = styles.cancel;
      buttonText = "Cancel My Request";
      break;

    case "view-feedback":
      variantClassname = styles.viewFeedback;
      buttonText = "View Feedback";
      break;

    default:
      variantClassname = styles.requestAccess;
      buttonText = "Request Access";
      break;
  }

  const classNames = `${styles.button} ${variantClassname}`;

  if (url) {
    return (
      <Link
        to={url}
        style={{
          marginTop: "auto",
          display: "block",
          width: "100%",
          textDecoration: "none",
        }}
      >
        <button type="button" className={classNames}>
          {buttonText}
        </button>
      </Link>
    );
  }

  return (
    <button type="button" className={classNames} onClick={onButtonClick}>
      {buttonText}
    </button>
  );
};

export default ButtonCV;
