import { ButtonProps } from "../../types/props";
import styles from "./Button.module.scss";

export default function Button({
  color,
  roundness,
  classNames,
  children,
  style,
  onClick,
}: ButtonProps) {
  const colorClass = color === "primary" ? styles.primary : styles.secondary;
  const roundnessClass =
    roundness === "rounded" ? styles.rounded : styles.smRounded;

  const allClasses: string = `${styles.button} ${colorClass} ${roundnessClass} ${classNames}`;

  return (
    <button
      type="button"
      className={allClasses}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
