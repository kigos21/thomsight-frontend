import StyledBox from "../../layout/StyledBox";
import styles from "../../layout/StyledBox.module.scss";

type AuthContentContainerProps = {
  children: React.ReactNode;
  classNames?: string;
  ableBoxShadow?: boolean;
};

export default function AuthContentContainer({
  children,
  classNames = "", // Default to an empty string if undefined
  ableBoxShadow = false, // Default to false
}: AuthContentContainerProps) {
  return (
    <div className={`${styles.container} ${classNames}`}>
      <StyledBox
        bgColor="var(--white)"
        border={ableBoxShadow ? "none" : "3px solid var(--muted-black)"}
        style={{
          maxWidth: "768px",
          marginLeft: "auto",
          marginRight: "auto",
          boxShadow: ableBoxShadow ? "0 0 16px rgba(0, 0, 0, 0.285)" : "none",
        }}
      >
        {children}
      </StyledBox>
    </div>
  );
}
