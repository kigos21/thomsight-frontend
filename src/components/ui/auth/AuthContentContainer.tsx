import StyledBox from "../../layout/StyledBox";

type AuthContentContainerProps = {
  children: React.ReactNode;
};

export default function AuthContentContainer({
  children,
}: AuthContentContainerProps) {
  return (
    <StyledBox
      bgColor="var(--white)"
      border="3px solid var(--muted-black)"
      style={{
        maxWidth: "1024px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {children}
    </StyledBox>
  );
}
