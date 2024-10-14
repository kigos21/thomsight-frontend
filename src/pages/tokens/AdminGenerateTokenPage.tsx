import { IconPlus } from "@tabler/icons-react";
import PaddedContainer from "../../components/layout/PaddedContainer";
import StyledBox from "../../components/layout/StyledBox";
import Button from "../../components/ui/Button";
import styles from "./AdminGenerateTokenPage.module.scss";
import TokenItem from "../../components/ui/tokens/TokenItem";
import axiosInstance from "../../services/axiosInstance";
import { useEffect, useState } from "react";
import Spinner from "../../components/ui/Spinner";
import SuccessMessage from "../../components/form/SuccessMessage";

export default function AdminGenerateTokenPage() {
  const [tokens, setTokens] = useState<
    { id: number; token: string; email: string | null }[]
  >([]);
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);
  const [generateLoading, setGenerateLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchTokens = async () => {
      setFetchLoading(true);
      try {
        const response = await axiosInstance.get("/api/tokens");
        console.log(response.data);
        setTokens(response.data);
      } catch (error) {
        console.error("Error fetching tokens:", error);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchTokens();
  }, []);

  const generateToken = async () => {
    setSuccess(false);
    setGenerateLoading(true);
    try {
      const response = await axiosInstance.post("/api/tokens/create");
      const newToken = response.data.token;

      setTokens((prevTokens) => [
        ...prevTokens,
        { id: prevTokens.length + 1, token: newToken, email: "" },
      ]);

      setSuccess(true);
    } catch (error) {
      console.error("Error generating token:", error);
    } finally {
      setGenerateLoading(false);
    }
  };

  return (
    <PaddedContainer>
      {fetchLoading && <Spinner message="Fetching tokens..." />}
      {generateLoading && <Spinner message="Generating token..." />}
      <div className={styles.title}>
        <h1>Tokens</h1>
        <Button classNames={styles.button} onClick={generateToken}>
          <IconPlus /> Generate Token
        </Button>
      </div>

      {success && <SuccessMessage message="Token generated successfully" />}

      <StyledBox classNames={styles.styledbox}>
        <div className={styles.companytokens}>
          <div className={styles.header}>
            <p>#</p>
            <p>Token</p>
            <p>Company</p>
          </div>
          {tokens.map((token, index) => (
            <TokenItem
              key={token.id}
              id={token.id}
              number={index + 1}
              token={token.token}
              email={token.email}
            />
          ))}
        </div>
      </StyledBox>
    </PaddedContainer>
  );
}
