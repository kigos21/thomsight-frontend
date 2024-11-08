import ButtonCV, { ButtonVariant } from "../ButtonCV";
import { Link } from "react-router-dom";
import styles from "./CVCard.module.scss";

interface CVCardProps {
  name: string;
  fileTitle: string;
  description: string;
  buttonVariant?: ButtonVariant;
  url?: string;
  onButtonClick?: () => void;
}

const CVCard = ({
  name,
  fileTitle,
  description,
  buttonVariant,
  url,
  onButtonClick,
}: CVCardProps) => {
  const buttonElement = url ? (
    <ButtonCV variant={buttonVariant} url={url} />
  ) : (
    <ButtonCV variant={buttonVariant} onButtonClick={onButtonClick} />
  );

  return (
    <div className={styles.card}>
      <p className={styles.name}>{name}</p>
      <Link to="#" className={styles.fileTitle}>
        {fileTitle}
      </Link>
      <p className={styles.description}>{description}</p>

      {buttonElement}
    </div>
  );
};

export default CVCard;
