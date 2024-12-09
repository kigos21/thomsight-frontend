import PaddedContainer from "../../components/layout/PaddedContainer";
import AuthContentContainer from "../../components/ui/auth/AuthContentContainer";
import Button from "../../components/ui/Button";
import FormField from "../../components/form/FormField";
import CheckboxWithLabel from "../../components/form/CheckboxWIthLabel";
import {
  IconLock,
  IconMail,
  // IconPhone,
  IconUser,
} from "@tabler/icons-react";

import styles from "./RegisterStudentPage.module.scss";
import { useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/ui/Spinner";
import { toast } from "react-toastify";
import { containsBadWords } from "../../badWordsFilter";

export default function StudentRegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

    if (name.length > 48) {
      toast.error("Name must be less than 48 characters.");
      return;
    }
    if (containsBadWords(name)) {
      toast.error("Name contains foul language");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+\.cics@ust\.edu\.ph$/;
    if (!emailRegex.test(email)) {
      toast.error("Email must be a valid CICS email (cics@ust.edu.ph).");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E])[A-Za-z\d\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]{8,}$/;
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
      await axiosInstance.post("/api/register-student", {
        name,
        email,
        password,
        // phone,
      });

      localStorage.setItem(
        "registrationSuccess",
        "Your account has been created successfully! Please verify your email before logging in."
      );
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Account already exists!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <PaddedContainer>
      <AuthContentContainer ableBoxShadow={true}>
        <div className={styles.container}>
          <h1 className={styles.header}>Register your Account</h1>
          {loading && <Spinner message="Registering student..." />}
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
              {/* Name Field */}
              <FormField
                icon={
                  <IconUser size={35} stroke={1.5} className={styles.icon} />
                }
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <FormField
                icon={
                  <IconMail size={35} stroke={1.5} className={styles.icon} />
                }
                type="email"
                placeholder="Email (cics@ust.edu.ph)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <FormField
                icon={
                  <IconLock size={35} stroke={1.5} className={styles.icon} />
                }
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

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
                color="secondary"
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
