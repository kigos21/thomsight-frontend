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
  IconCalendar,
} from "@tabler/icons-react";
import { useState } from "react";
import styles from "./RegisterAlumniPage.module.scss";
import axiosInstance from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/ui/Spinner";
import { toast } from "react-toastify";
import { containsBadWords } from "../../badWordsFilter";

export default function RegisterAlumniPage() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState<string>("");

  const validateBirthday = (value: string): boolean => {
    const dateRegex = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/([12]\d{3})$/;

    if (!dateRegex.test(value)) {
      toast.error("Please enter valid date in dd/mm/yyyy format");
      return false;
    }

    const [day, month, year] = value.split("/").map(Number);
    const date = new Date(year, month - 1, day);
    const isValidDate =
      date.getMonth() === month - 1 &&
      date.getDate() === day &&
      date.getFullYear() === year;

    if (!isValidDate) {
      toast.error("Please enter a valid date");
      return false;
    }

    if (date > new Date()) {
      toast.error("Birthday cannot be in the future");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (firstName.trim() === "") {
      toast.error("First name should not be left blank");
      return;
    }
    if (lastName.trim() === "") {
      toast.error("Last name should not be left blank");
      return;
    }
    if (birthday.trim() === "") {
      toast.error("Birthday should not be left blank");
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
    if (firstName.length + lastName.length > 48) {
      toast.error(
        "Combined length of first name and last name must not exceed 48 characters."
      );
      return;
    }
    if (containsBadWords(firstName) || containsBadWords(lastName)) {
      toast.error("Name contains foul language");
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

    const isBirthdayValid = validateBirthday(birthday);
    if (!isBirthdayValid) return;

    try {
      setLoading("Registering alumni...");
      await axiosInstance.post("/api/register-alumni", {
        firstName,
        lastName,
        birthday,
        email,
        password,
      });

      localStorage.setItem(
        "registrationSuccess",
        "Your account has been created successfully! Please verify your email before logging in."
      );
      navigate("/login");
      // console.log(response);
    } catch (error) {
      console.error("Alumni not found in the records" + error);
      toast.error("Alumni not found in the records.");
    } finally {
      setLoading("");
    }
  };

  const handleBirthdayChange = (value: string) => {
    setBirthday(value);
  };

  return (
    <PaddedContainer>
      <AuthContentContainer ableBoxShadow={true}>
        <div className={styles.container}>
          {loading && <Spinner message={loading} />}
          <h1 className={styles.header}>Register your Account</h1>
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
              {/* <FormField
                icon={
                  <IconUser size={35} stroke={1.5} className={styles.icon} />
                }
                type="number"
                placeholder="Student ID"
                extraProps={{ min: 10, max: 16 }}
                required={true}
              /> */}
              <FormField
                icon={
                  <IconUser size={35} stroke={1.5} className={styles.icon} />
                }
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <FormField
                icon={
                  <IconUser size={35} stroke={1.5} className={styles.icon} />
                }
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <FormField
                icon={
                  <IconCalendar
                    size={35}
                    stroke={1.5}
                    className={styles.icon}
                  />
                }
                type="text"
                name="birthday"
                placeholder="Birthday (mm/dd/yyyy)"
                onChange={(e) => handleBirthdayChange(e.target.value)}
                extraProps={{
                  title: "Enter date in mm/dd/yyyy format",
                  pattern: "\\d{2}/\\d{2}/\\d{4}",
                }}
                value={birthday}
              />
              <FormField
                icon={
                  <IconMail size={35} stroke={1.5} className={styles.icon} />
                }
                type="email"
                placeholder="Email"
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

              <div className={styles.passwordContainer}>
                <p className={styles.passwordHeader}>Password Requirements:</p>
                <div className={styles.instructions}>
                  <p>• At least 8 characters</p>
                  <p>• Contains a special character </p>
                  <p>• Uppercase and lowercase letters</p>
                </div>
              </div>

              <FormField
                icon={
                  <IconLock size={35} stroke={1.5} className={styles.icon} />
                }
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {/* <FormField
                icon={
                  <IconPhone size={35} stroke={1.5} className={styles.icon} />
                }
                type="tel"
                placeholder="Phone Number"
                required={true}
              /> */}
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
                color="secondary"
                roundness="rounded"
                classNames={styles.button}
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
