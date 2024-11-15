import PaddedContainer from "../../components/layout/PaddedContainer";
import AuthContentContainer from "../../components/ui/auth/AuthContentContainer";
import Button from "../../components/ui/Button";
import FormField from "../../components/form/FormField";

import {
  IconLock,
  IconMail,
  // IconPhone,
  IconBuildings,
  IconUser,
} from "@tabler/icons-react";

import styles from "./RegisterCompanyPage.module.scss";
import { useEffect, useState } from "react";
import { useToken } from "../../contexts/TokenContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import Spinner from "../../components/ui/Spinner";
import { toast } from "react-toastify";
import { containsBadWords } from "../../badWordsFilter";
import CheckboxWithLabel from "../../components/form/CheckboxWIthLabel";

export default function CompanyRegisterPage() {
  const { token } = useToken();
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!token) {
      navigate("/register/token");
    }
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (companyName.trim() === "") {
      toast.error("Company name should not be left blank");
      return;
    }
    if (name.trim() === "") {
      toast.error("Name should not be left blank");
      return;
    }
    if (email.trim() === "") {
      toast.error("Email should not be left blank");
      return;
    }
    if (password.trim() === "") {
      toast.error("Password should not be left blank");
      return;
    }
    if (confirmPassword.trim() === "") {
      toast.error("Confirm password should not be left blank");
      return;
    }

    if (companyName.length > 100) {
      toast.error("Company name must be less than 100 characters.");
      return;
    }
    if (containsBadWords(companyName)) {
      toast.error("Company name contains foul language");
    }

    if (name.length > 48) {
      toast.error("Name must be less than 48 characters.");
      return;
    }
    if (containsBadWords(name)) {
      toast.error("Name contains foul language");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters, include 1 special character, and have both uppercase and lowercase letters."
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await axiosInstance.get("/sanctum/csrf-cookie");
      const userResponse = await axiosInstance.post("/api/register-rep", {
        name,
        email,
        password,
        // phone,
      });

      const userId = userResponse.data.user_id;

      const companyData = {
        name: companyName,
        posted_by: userId,
        token: token,
      };

      const response = await axiosInstance.post(
        "/api/company/create",
        companyData
      );
      if (response)
        await axiosInstance.delete(`/api/token/delete`, {
          data: { token },
        });

      localStorage.setItem(
        "registrationSuccess",
        "Your account has been created successfully! Please verify your email before logging in."
      );

      navigate("/login");
    } catch (error) {
      console.error("Error registering company:", error);
      toast.error("Account already exists!");
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
              />

              {/* Name Field */}
              <FormField
                icon={
                  <IconUser size={35} stroke={1.5} className={styles.icon} />
                }
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              />

              <CheckboxWithLabel
                id="terms"
                label="I have read and agree to the website"
                linkText="terms & conditions"
                linkHref="/terms-and-conditions"
                required={true}
              />
              <CheckboxWithLabel
                id="privacy"
                label="By ticking this box, I agree that I have read the"
                linkText="data privacy policy"
                linkHref="/data-privacy"
                required={true}
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
