import styles from "./PaddedContainer.module.scss";

import { PaddedContainerProps } from "../../types/props";

export default function PaddedContainer({
  children,
  classNames,
  style,
}: PaddedContainerProps) {
  return (
    <div className={`${styles.container} ${classNames}`} style={style}>
      {children}
    </div>
  );
}
