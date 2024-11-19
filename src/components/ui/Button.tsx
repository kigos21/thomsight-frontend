import { ButtonProps } from "../../types/props";
import styles from "./Button.module.scss";

export default function Button({
  color,
  roundness,
  classNames,
  children,
  style,
  onClick,
  type,
}: ButtonProps) {
  const colorClass =
    color === "primary"
      ? styles.primary
      : color === "secondary"
        ? styles.secondary
        : color === "black"
          ? styles.black
          : styles.gray;
  const roundnessClass =
    roundness === "rounded" ? styles.rounded : styles.smRounded;

  const allClasses: string = `${styles.button} ${colorClass} ${roundnessClass} ${classNames}`;

  return (
    <button className={allClasses} style={style} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
