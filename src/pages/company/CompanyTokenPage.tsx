import PaddedContainer from "../../components/layout/PaddedContainer";
import Button from "../../components/ui/Button";
import FormField from "../../components/form/FormField";
import { IconKey } from "@tabler/icons-react";

import styles from "./CompanyTokenPage.module.scss";
import axiosInstance from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CompanyTokenPage() {
  const [token, setToken] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleTokenChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setToken(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post("/api/validate-token", {
        token,
      });

      if (response.data.valid) {
        navigate("/register/company");
      } else {
        setError("Invalid token. Please try again.");
      }
    } catch (error) {
      console.error("Error validating token:", error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaddedContainer>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <form className={styles.form}>
            <FormField
              icon={<IconKey size={35} stroke={1.5} className={styles.icon} />}
              type={"input"}
              placeholder={"Enter Token"}
              required={true}
              value={token}
              onChange={handleTokenChange}
            />
            {error && <p className={styles.errorMessage}>{error}</p>}
          </form>
          <Button
            color="primary"
            roundness="rounded"
            classNames={styles.button}
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Validating..." : "Validate"}
          </Button>
        </div>
      </div>
    </PaddedContainer>
  );
}
