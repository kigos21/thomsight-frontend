import PaddedContainer from "../../components/layout/PaddedContainer";
import AuthContentContainer from "../../components/ui/auth/AuthContentContainer";
import Button from "../../components/ui/Button";
import FormField from "../../components/form/FormField";
import CheckboxWithLabel from "../../components/form/CheckboxWIthLabel";
import {
  IconLock,
  IconMail,
  IconPhone,
  IconUser,
  IconCalendar,
} from "@tabler/icons-react";
import { useState, ChangeEvent } from "react";
import styles from "./RegisterAlumniPage.module.scss";

export default function RegisterAlumniPage() {
  const [birthdayError, setBirthdayError] = useState<string>("");

  const validateBirthday = (value: string): boolean => {
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/([12]\d{3})$/;

    if (!dateRegex.test(value)) {
      setBirthdayError("Please enter date in mm/dd/yyyy format");
      return false;
    }

    const [month, day, year] = value.split("/").map(Number);
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const birthdayInput = formElement.elements.namedItem(
      "birthday"
    ) as HTMLInputElement;
    if (validateBirthday(birthdayInput.value)) {
      // Proceed with form submission
      console.log("Form submitted successfully");
    }
  };

  // const handleBirthdayChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   validateBirthday(e.target.value);
  // };

  return (
    <PaddedContainer>
      <AuthContentContainer>
        <div className={styles.container}>
          <h1 className={styles.header}>Register your Account</h1>
          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <FormField
                icon={
                  <IconUser size={35} stroke={1.5} className={styles.icon} />
                }
                type="number"
                placeholder="Student ID"
                extraProps={{ min: 10, max: 16 }}
                required={true}
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
                onChange={(e) => validateBirthday(e.target.value)}
                required={true}
                extraProps={{
                  title: "Enter date in mm/dd/yyyy format",
                  pattern: "\\d{2}/\\d{2}/\\d{4}",
                }}
              />
              {birthdayError && (
                <div className="text-red-500 text-sm mt-1 mb-2">
                  {birthdayError}
                </div>
              )}
              <FormField
                icon={
                  <IconMail size={35} stroke={1.5} className={styles.icon} />
                }
                type="email"
                placeholder="Email"
                required={true}
              />
              <FormField
                icon={
                  <IconLock size={35} stroke={1.5} className={styles.icon} />
                }
                type="password"
                placeholder="Password"
                required={true}
              />
              <FormField
                icon={
                  <IconLock size={35} stroke={1.5} className={styles.icon} />
                }
                type="password"
                placeholder="Confirm Password"
                required={true}
              />
              <FormField
                icon={
                  <IconPhone size={35} stroke={1.5} className={styles.icon} />
                }
                type="tel"
                placeholder="Phone Number"
                required={true}
              />
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
