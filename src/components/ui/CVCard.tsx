import ButtonCV, { ButtonVariant } from "./ButtonCV";
import { Link } from "react-router-dom";
import styles from "./CVCard.module.scss";

interface CVCardProps {
  name: string;
  fileTitle: string;
  description: string;
  buttonVariant?: ButtonVariant;
}

const CVCard = ({
  name,
  fileTitle,
  description,
  buttonVariant,
}: CVCardProps) => {
  return (
    <div className={styles.card}>
      <p className={styles.name}>{name}</p>
      <Link to="#" className={styles.fileTitle}>
        {fileTitle}
      </Link>
      <p className={styles.description}>{description}</p>
      <ButtonCV variant={buttonVariant} />
    </div>
  );
};

export default CVCard;
