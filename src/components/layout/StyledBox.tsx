import { StyledBoxProps } from "../../types/props";
import PaddedContainer from "./PaddedContainer";

import styles from "./StyledBox.module.scss";

export default function StyledBox({
  children,
  bgColor,
  border,
  classNames,
  paddedContainerClass,
  style,
}: StyledBoxProps) {
  return (
    <div
      className={`${styles.container} ${classNames}`}
      style={{ border: border, backgroundColor: bgColor, ...style }}
    >
      <PaddedContainer classNames={paddedContainerClass}>
        {children}
      </PaddedContainer>
    </div>
  );
}
