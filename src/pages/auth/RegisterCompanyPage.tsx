import PaddedContainer from "../../components/layout/PaddedContainer";
import AuthContentContainer from "../../components/ui/auth/AuthContentContainer";
import Button from "../../components/ui/Button";
import FormField from "../../components/form/FormField";
import CheckboxWithLabel from "../../components/form/CheckboxWIthLabel";

import {
  IconLock,
  IconMail,
  IconPhone,
  IconBuildings,
} from "@tabler/icons-react";

import styles from "./RegisterCompanyPage.module.scss";
import { useEffect, useState } from "react";
import { useToken } from "../../contexts/TokenContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance"; // For making API requests
import Spinner from "../../components/ui/Spinner"; // Assuming you have a Spinner component

export default function CompanyRegisterPage() {
  const { token } = useToken(); // Assuming removeToken only removes it from context
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      navigate("/register/token");
    }
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const userResponse = await axiosInstance.post("/api/register-rep", {
        name,
        email,
        password,
        phone,
      });

      const userId = userResponse.data.user_id;
      const companyData = {
        name: companyName,
        posted_by: userId,
      };

      // Step 2: Delete the token from the database
      // await axiosInstance.delete(`/api/token`, {
      //   data: { token }, // Send the token to be deleted
      // });

      // Step 3: Remove the token from context
      // removeToken();

      // Step 4: Register company
      await axiosInstance.post("/api/company/create", companyData);

      // Step 5: Redirect to dashboard or success page
      navigate("/login/student");
    } catch (error) {
      console.error("Error registering company:", error);
      setError("There was an error during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaddedContainer>
      <AuthContentContainer>
        {loading && <Spinner message="Registering your company..." />}
        <div className={styles.container}>
          <h1 className={styles.header}>Register your Company</h1>
          <h1>Register your Company</h1>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
              {/* Company Name Field */}
              <FormField
                icon={
                  <IconBuildings
                    size={35}
                    stroke={1.5}
                    className={styles.icon}
                  />
                }
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />

              {/* Name Field */}
              <FormField
                icon={
                  <IconMail size={35} stroke={1.5} className={styles.icon} />
                }
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              {/* Email Field */}
              <FormField
                icon={
                  <IconMail size={35} stroke={1.5} className={styles.icon} />
                }
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {/* Password Field */}
              <FormField
                icon={
                  <IconLock size={35} stroke={1.5} className={styles.icon} />
                }
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {/* Confirm Password Field */}
              <FormField
                icon={
                  <IconLock size={35} stroke={1.5} className={styles.icon} />
                }
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              {/* Phone Number Field */}
              <FormField
                icon={
                  <IconPhone size={35} stroke={1.5} className={styles.icon} />
                }
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />

              {/* Terms and Conditions Checkbox */}
              <CheckboxWithLabel
                id="terms"
                label="I have read and agree to the website"
                linkText="terms & conditions"
                linkHref="#"
                required
              />

              {/* Data Privacy Policy Checkbox */}
              <CheckboxWithLabel
                id="privacy"
                label="By ticking this box, I agree that I have read the"
                linkText="data privacy policy"
                linkHref="#"
                required
              />

              <Button
                type="submit"
                color="primary"
                roundness="rounded"
                classNames={styles.button}
                disabled={loading}
              >
                Create Account
              </Button>
            </form>
          </div>
        </div>
      </AuthContentContainer>
    </PaddedContainer>
  );
}
