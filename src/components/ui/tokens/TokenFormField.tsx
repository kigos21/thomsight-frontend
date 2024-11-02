import React, { useState } from "react";
import { TokenFormFieldProps } from "../../../types/props";
import styles from "./TokenFormField.module.scss";
import { IconEdit } from "@tabler/icons-react";
import axiosInstance from "../../../services/axiosInstance";
import Spinner from "../Spinner";

const TokenFormField: React.FC<TokenFormFieldProps> = ({
  icon,
  type,
  placeholder,
  required,
  extraProps,
  classNames,
  editIcon = <IconEdit />, // Default icon if none is provided
  readOnly: initialReadOnly = true, // Default to true if not provided
  initialEmail,
  tokenId,
  setError,
  setSuccess,
}) => {
  const [isReadOnly, setIsReadOnly] = useState<boolean>(initialReadOnly);
  const [email, setEmail] = useState<string>(initialEmail || "");
  const [loading, setLoading] = useState<boolean>(false);

  const handleEditClick = () => {
    setIsReadOnly(false); // Make the input editable when the edit icon is clicked
    setSuccess("");
    setError("");
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleBlur = async () => {
    if (!isReadOnly) {
      if (!validateEmail(email)) {
        setError("Please enter a valid email address.");
        return;
      }
      setLoading(true);
      try {
        await axiosInstance.put(`/api/tokens/${tokenId}/update`, { email });
        setError("");
        setIsReadOnly(true);
        setSuccess("Updated email successfully");
      } catch (error) {
        console.error("Error updating company:", error);
        setError("Error updating email. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={`${styles.formGroup} ${classNames}`}>
      {loading && <Spinner message="Updating email..." />}
      {icon && <span className={styles.icon}>{icon}</span>}
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className={`${styles.formField} ${isReadOnly ? styles.readOnly : ""}`}
        {...extraProps}
        readOnly={isReadOnly}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={handleBlur}
        value={email}
      />
      {editIcon && (
        <span className={styles.editIcon} onClick={handleEditClick}>
          {editIcon}
        </span>
      )}
    </div>
  );
};

export default TokenFormField;
