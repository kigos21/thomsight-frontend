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
import ValidationError from "../../components/form/ValidationError";

export default function CompanyRegisterPage() {
  const { token } = useToken();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const [companyName, setCompanyName] = useState<string>("");
  const [companyNameError, setCompanyNameError] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  // const [phone, setPhone] = useState<string>();
  // const [phoneError, setPhoneError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!token) {
      navigate("/register/token");
    }
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    setCompanyNameError("");
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    // setPhoneError("");

    if (companyName.length > 100) {
      setCompanyNameError("Company name must be less than 100 characters.");
      isValid = false;
    }

    if (name.length > 100) {
      setNameError("Name must be less than 100 characters.");
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters, include 1 special character, and have both uppercase and lowercase letters."
      );
      isValid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    }

    // if (isNaN(Number(phone))) {
    //   setPhoneError("Phone number must be a number.");
    //   isValid = false;
    // } else if (!/^\d{11}$/.test(phone?.toString() || "")) {
    //   setPhoneError("Phone number must be 11 digits.");
    //   isValid = false;
    // }

    if (!isValid) return;

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
      };

      await axiosInstance.delete(`/api/token/delete`, {
        data: { token },
      });

      await axiosInstance.post("/api/company/create", companyData);

      navigate("/login");
    } catch (error) {
      console.error("Error registering company:", error);
      setError("Account already exists!");
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
            {error && <ValidationError message={error} />}
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
              {companyNameError && (
                <ValidationError message={companyNameError} />
              )}

              {/* Name Field */}
              <FormField
                icon={
                  <IconUser size={35} stroke={1.5} className={styles.icon} />
                }
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {nameError && <ValidationError message={nameError} />}

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
              {emailError && <ValidationError message={emailError} />}

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
              {passwordError && <ValidationError message={passwordError} />}

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
              {confirmPasswordError && (
                <ValidationError message={confirmPasswordError} />
              )}

              {/* Phone Number Field */}
              {/* <FormField
                icon={
                  <IconPhone size={35} stroke={1.5} className={styles.icon} />
                }
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              {phoneError && <ValidationError message={phoneError} />} */}

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
