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
import ValidationError from "../../components/form/ValidationError";
import axiosInstance from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/ui/Spinner";

export default function RegisterAlumniPage() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [birthdayError, setBirthdayError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState<string>("");

  const validateBirthday = (value: string): boolean => {
    const dateRegex = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/([12]\d{3})$/;

    if (!dateRegex.test(value)) {
      setBirthdayError("Please enter valid date in dd/mm/yyyy format");
      return false;
    }

    const [day, month, year] = value.split("/").map(Number);
    const date = new Date(year, month - 1, day);
    const isValidDate =
      date.getMonth() === month - 1 &&
      date.getDate() === day &&
      date.getFullYear() === year;

    if (!isValidDate) {
      setBirthdayError("Please enter a valid date");
      return false;
    }

    if (date > new Date()) {
      setBirthdayError("Birthday cannot be in the future");
      return false;
    }

    setBirthdayError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setError("");
    e.preventDefault();
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters, include 1 special character, and have both uppercase and lowercase letters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }

    const isBirthdayValid = validateBirthday(birthday);
    if (!isBirthdayValid) return;

    // const formElement = e.currentTarget;
    // const birthdayInput = formElement.elements.namedItem(
    //   "birthday"
    // ) as HTMLInputElement;
    // if (validateBirthday(birthdayInput.value)) {
    //   // Proceed with form submission
    //   console.log("Form submitted successfully");
    // }

    try {
      setLoading("Registering alumni...");
      const response = await axiosInstance.post("/api/register-alumni", {
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
      setError("Alumni not found in the records.");
    } finally {
      setLoading("");
    }
  };

  const handleBirthdayChange = (value: string) => {
    validateBirthday(value);
    setBirthday(value);
  };

  return (
    <PaddedContainer>
      <AuthContentContainer>
        <div className={styles.container}>
          {error && <ValidationError message={error} />}
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
                required={true}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <FormField
                icon={
                  <IconUser size={35} stroke={1.5} className={styles.icon} />
                }
                type="text"
                placeholder="Last Name"
                required={true}
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
                required={true}
                extraProps={{
                  title: "Enter date in mm/dd/yyyy format",
                  pattern: "\\d{2}/\\d{2}/\\d{4}",
                }}
                value={birthday}
              />
              {birthdayError && <ValidationError message={birthdayError} />}
              <FormField
                icon={
                  <IconMail size={35} stroke={1.5} className={styles.icon} />
                }
                type="email"
                placeholder="Email"
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
                type="submit"
                color="primary"
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
