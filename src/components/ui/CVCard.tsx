import ButtonCV from "./ButtonCV";
import { Link } from "react-router-dom";
import styles from "./CVCard.module.scss";

interface CVCardProps {
  name: string;
  fileTitle: string;
  description: string;
  buttonText: string;
}

const CVCard = ({ name, fileTitle, description, buttonText }: CVCardProps) => {
  return (
    <div className={styles.card}>
      <p className={styles.name}>{name}</p>
      <Link to="#">{fileTitle}</Link>
      <p>{description}</p>
      <ButtonCV>{buttonText}</ButtonCV>
    </div>
  );
};

export default CVCard;
