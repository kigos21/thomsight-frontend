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
import ValidationError from "../../components/form/ValidationError";

export default function AdminGenerateTokenPage() {
  const [tokens, setTokens] = useState<
    { id: number; token: string; email: string | null; expiring: boolean }[]
  >([]);
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);
  const [generateLoading, setGenerateLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const [deleteSuccess, setDeleteSuccess] = useState<string | null>(null);
  const [emailSuccess, setEmailSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchTokens = async () => {
      setFetchLoading(true);
      try {
        const response = await axiosInstance.get("/api/tokens");
        console.log(response.data);
        const tokensWithExpiringStatus = response.data.map((token: any) => {
          const expiresAt = new Date(token.expires_at);
          const isExpiring =
            expiresAt <=
            new Date(new Date().setMonth(new Date().getMonth() + 2));

          return {
            ...token,
            expiring: isExpiring,
          };
        });
        setTokens(tokensWithExpiringStatus);
      } catch (error) {
        console.error("Error fetching tokens:", error);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchTokens();
  }, []);

  const generateToken = async () => {
    setSuccess("");
    setDeleteSuccess(null);
    setEmailSuccess("");
    setError("");
    setGenerateLoading(true);
    try {
      const response = await axiosInstance.post("/api/tokens/create");
      const newToken = response.data.token;

      setTokens((prevTokens) => [
        ...prevTokens,
        { id: response.data.id, token: newToken, email: "", expiring: false },
      ]);

      setSuccess("Token generated successfully");
    } catch (error) {
      console.error("Error generating token:", error);
    } finally {
      setGenerateLoading(false);
    }
  };

  const handleDeleteToken = (tokenId: number) => {
    setTokens((prevTokens) =>
      prevTokens.filter((token) => token.id !== tokenId)
    );
    setDeleteSuccess("Token deleted successfully");
  };

  const resetDeleteSuccess = () => {
    setDeleteSuccess(null);
    setSuccess("");
    setEmailSuccess("");
    setError("");
  };

  const handleEmailSuccess = () => {
    setEmailSuccess("Token emailed successfully");
  };

  const updateTokenEmail = (tokenId: number, newEmail: string | null) => {
    setTokens((prevTokens) =>
      prevTokens.map((token) =>
        token.id === tokenId ? { ...token, email: newEmail } : token
      )
    );
  };

  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      {fetchLoading && <Spinner message="Fetching tokens..." />}
      {generateLoading && <Spinner message="Generating token..." />}
      <div className={styles.title}>
        <div className={styles.titleRight}>
          <h1>Tokens</h1>
        </div>
        <div className={styles.titleLeft}>
          <Button
            color="secondary"
            roundness="rounded"
            classNames={styles.button}
            onClick={generateToken}
          >
            <IconPlus /> Generate Token
          </Button>
        </div>
      </div>

      {success && <SuccessMessage message={success} />}
      {deleteSuccess && <SuccessMessage message={deleteSuccess} />}
      {emailSuccess && <SuccessMessage message={emailSuccess} />}
      {error && <ValidationError message={error} />}

      <StyledBox classNames={styles.styledbox}>
        <div className={styles.companytokens}>
          <div className={styles.header}>
            <div className={styles.row}>
              <p>#</p>
              <p>Token</p>
              <p>Status</p>
              <p>Company Email</p>
              <p>Actions</p>
            </div>
          </div>
          {tokens.map((token, index) => (
            <TokenItem
              key={token.id}
              id={token.id}
              number={index + 1}
              token={token.token}
              email={token.email}
              onDeleteToken={handleDeleteToken}
              resetDeleteSuccess={resetDeleteSuccess}
              handleEmailSuccess={handleEmailSuccess}
              setError={setError}
              setSuccess={setSuccess}
              updateEmail={async (newEmail: string | null) => {
                updateTokenEmail(token.id, newEmail);
              }}
              expiring={token.expiring}
            />
          ))}
        </div>
      </StyledBox>
    </PaddedContainer>
  );
}
