import PaddedContainer from "../../components/layout/PaddedContainer";
import Button from "../../components/ui/Button";
import FormField from "../../components/form/FormField";
import { IconKey } from "@tabler/icons-react";

import styles from "./CompanyTokenPage.module.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { validateToken } from "../../api/validateToken";
import { useToken } from "../../contexts/TokenContext";
import { toast } from "react-toastify";

export default function CompanyTokenPage() {
  const [tokenInput, setTokenInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setToken } = useToken();

  const handleTokenChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTokenInput(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (tokenInput.trim() === "") {
      toast.error("Please input a token");
      setLoading(false);
      return;
    }
    const isValid = await validateToken(tokenInput);
    if (isValid) {
      setToken(tokenInput);
      navigate("/register/company");
    } else {
      toast.error("Invalid token. Please try again.");
    }
    setLoading(false);
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
            color="secondary"
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
