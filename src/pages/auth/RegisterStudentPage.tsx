import PaddedContainer from "../../components/layout/PaddedContainer";
import AuthContentContainer from "../../components/ui/auth/AuthContentContainer";
import Button from "../../components/ui/Button";
import FormField from "../../components/form/FormField";
import CheckboxWithLabel from "../../components/form/CheckboxWIthLabel";
import { IconLock, IconMail, IconPhone, IconUser } from "@tabler/icons-react";

import styles from "./RegisterStudentPage.module.scss";
import { useState } from "react";
import ValidationError from "../../components/form/ValidationError";
import axiosInstance from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/ui/Spinner";

export default function StudentRegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [phone, setPhone] = useState<number | null>();
  const [phoneError, setPhoneError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setPhoneError("");

    if (name.length > 100) {
      setNameError("Name must be less than 100 characters.");
      isValid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+\.cics@ust\.edu\.ph$/;
    if (!emailRegex.test(email)) {
      setEmailError("Email must be a valid CICS email (cics@ust.edu.ph).");
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

    if (isNaN(Number(phone))) {
      setPhoneError("Phone number must be a number.");
      isValid = false;
    } else if (!/^\d{11}$/.test(phone?.toString() || "")) {
      setPhoneError("Phone number must be 11 digits.");
      isValid = false;
    }

    if (!isValid) return;

    setLoading(true);

    try {
      await axiosInstance.get("/sanctum/csrf-cookie");
      await axiosInstance.post("/api/register-student", {
        name,
        email,
        password,
        phone,
      });

      localStorage.setItem(
        "registrationSuccess",
        "Your account has been created successfully!"
      );
      navigate("/login/student");
    } catch (error) {
      console.error("Error registering user:", error);
      setError("Account already exists!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <PaddedContainer>
      <AuthContentContainer>
        <div className={styles.container}>
          <h1 className={styles.header}>Register your Account</h1>
          {loading && <Spinner message="Registering student..." />}
          <div className={styles.formContainer}>
            {error && <ValidationError message={error} />}
            <form className={styles.form} onSubmit={handleSubmit}>
              {/* Name Field */}
              <FormField
                icon={
                  <IconUser size={35} stroke={1.5} className={styles.icon} />
                }
                type="text"
                placeholder="Full Name"
                required={true}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {nameError && <ValidationError message={nameError} />}

              <FormField
                icon={
                  <IconMail size={35} stroke={1.5} className={styles.icon} />
                }
                type="email"
                placeholder="Email (cics@ust.edu.ph)"
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <ValidationError message={emailError} />}

              <FormField
                icon={
                  <IconLock size={35} stroke={1.5} className={styles.icon} />
                }
                type="password"
                placeholder="Password"
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <ValidationError message={passwordError} />}

              <FormField
                icon={
                  <IconLock size={35} stroke={1.5} className={styles.icon} />
                }
                type="password"
                placeholder="Confirm Password"
                required={true}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {confirmPasswordError && (
                <ValidationError message={confirmPasswordError} />
              )}

              <FormField
                icon={
                  <IconPhone size={35} stroke={1.5} className={styles.icon} />
                }
                type="tel"
                placeholder="Phone Number"
                required={true}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {phoneError && <ValidationError message={phoneError} />}

              <CheckboxWithLabel
                id="terms"
                label="I have read and agree to the website"
                linkText="terms & conditions"
                linkHref="#"
                required={true}
              />
              <CheckboxWithLabel
                id="privacy"
                label="By ticking this box, I agree that I have read the"
                linkText="data privacy policy"
                linkHref="#"
                required={true}
              />
              <Button
                color="primary"
                roundness="rounded"
                classNames={styles.button}
                type="submit"
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
