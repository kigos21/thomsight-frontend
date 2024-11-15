import React, { useState } from "react";
import { TokenFormFieldProps } from "../../../types/props";
import styles from "./TokenFormField.module.scss";
import { IconEdit, IconDeviceFloppy } from "@tabler/icons-react";
import axiosInstance from "../../../services/axiosInstance";
import Spinner from "../Spinner";
import { toast } from "react-toastify";

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
  updateEmail,
}) => {
  const [isReadOnly, setIsReadOnly] = useState<boolean>(initialReadOnly);
  const [email, setEmail] = useState<string>(initialEmail || "");
  const [loading, setLoading] = useState<boolean>(false);

  const handleEditClick = () => {
    setIsReadOnly(false); // Make the input editable when the edit icon is clicked
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email === "" || emailRegex.test(email);
  };

  const handleSaveClick = () => {
    handleBlur();
  };

  const handleBlur = async () => {
    if (!isReadOnly) {
      if (!validateEmail(email)) {
        toast.error("Please leave it blank or enter a valid email address.");
        return;
      }
      setLoading(true);
      try {
        if (email === "") {
          await axiosInstance.put(`/api/tokens/${tokenId}/update`, {
            email: null,
          });
          toast.success("Removed email successfully");
          updateEmail("");
        } else {
          await axiosInstance.put(`/api/tokens/${tokenId}/update`, { email });
          toast.success("Updated email successfully");
          updateEmail(email);
        }
      } catch (error) {
        console.error("Error updating company:", error);
        toast.error("Error updating email. Please try again.");
      } finally {
        setLoading(false);
        setIsReadOnly(true);
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
        value={email}
      />
      {isReadOnly ? (
        <span className={styles.editIcon} onClick={handleEditClick}>
          {editIcon}
        </span>
      ) : (
        <span className={styles.saveIcon} onClick={handleSaveClick}>
          <IconDeviceFloppy />
        </span>
      )}
    </div>
  );
};

export default TokenFormField;
