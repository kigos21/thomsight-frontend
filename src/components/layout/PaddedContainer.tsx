import styles from "./PaddedContainer.module.scss";

import { PaddedContainerProps } from "../../types/props";

export default function PaddedContainer({
  children,
  classNames,
  style,
}: PaddedContainerProps) {
  return (
    <div className={`${classNames} ${styles.container}`} style={style}>
      {children}
    </div>
  );
}
