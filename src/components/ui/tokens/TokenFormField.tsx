import React, { useState } from "react";
import { TokenFormFieldProps } from "../../../types/props";
import styles from "./TokenFormField.module.scss";
import { IconEdit } from "@tabler/icons-react";

const TokenFormField: React.FC<TokenFormFieldProps> = ({
  icon,
  type,
  placeholder,
  required,
  extraProps,
  classNames,
  editIcon = <IconEdit />, // Default icon if none is provided
  readOnly: initialReadOnly = true, // Default to true if not provided
}) => {
  const [isReadOnly, setIsReadOnly] = useState<boolean>(initialReadOnly);

  const handleEditClick = () => {
    setIsReadOnly(false); // Make the input editable when the edit icon is clicked
  };

  return (
    <div className={`${styles.formGroup} ${classNames}`}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className={`${styles.formField} ${isReadOnly ? styles.readOnly : ""}`}
        {...extraProps}
        readOnly={isReadOnly}
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
