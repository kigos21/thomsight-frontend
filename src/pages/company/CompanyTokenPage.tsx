import PaddedContainer from "../../components/layout/PaddedContainer";
import Button from "../../components/ui/Button";
import FormField from "../../components/form/FormField";
import { IconKey } from "@tabler/icons-react";

import styles from "./CompanyTokenPage.module.scss";
import axiosInstance from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ValidationError from "../../components/form/ValidationError";
import { validateToken } from "../../api/validateToken";
import { useToken } from "../../contexts/TokenContext";

export default function CompanyTokenPage() {
  const [tokenInput, setTokenInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setToken } = useToken();

  const handleTokenChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTokenInput(e.target.value);
  };

  const handleSubmit = async () => {
    const isValid = await validateToken(tokenInput);

    if (isValid) {
      setToken(tokenInput);
      navigate("/register/company");
    } else {
      setError("Invalid token. Please try again.");
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
              value={tokenInput}
              onChange={handleTokenChange}
            />
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
        {error && <ValidationError message={error} />}
      </div>
    </PaddedContainer>
  );
}
