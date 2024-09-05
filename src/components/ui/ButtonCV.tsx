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
  children: React.ReactNode;
  variant?: ButtonVariant;
}

const ButtonCV = ({ variant }: ButtonCVProps) => {
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
      break;
  }

  const classNames = `${styles.button} ${variantClassname}`;

  return (
    <button type="button" className={classNames}>
      {buttonText}
    </button>
  );
};

export default ButtonCV;
