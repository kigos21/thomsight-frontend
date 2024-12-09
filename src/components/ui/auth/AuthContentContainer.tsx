import StyledBox from "../../layout/StyledBox";
import styles from "../../layout/StyledBox.module.scss";

type AuthContentContainerProps = {
  children: React.ReactNode;
  classNames?: string;
};

export default function AuthContentContainer({
  children,
  classNames,
}: AuthContentContainerProps) {
  return (
    <div className={`${styles.container} ${classNames}`}>
      <StyledBox
        bgColor="var(--white)"
        border="3px solid var(--muted-black)"
        style={{
          maxWidth: "768px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {children}
      </StyledBox>
    </div>
  );
}
