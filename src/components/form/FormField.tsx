import { FormFieldProps } from "../../types/props";
import styles from "./FormField.module.scss";

const FormField: React.FC<FormFieldProps> = ({
  icon,
  type,
  placeholder,
  required,
  value,
  extraProps,
  classNames,
  parentDivClassnames,
  editIcon,
  onChange,
  name,
  ableBoxShadow, // Add a new prop
}) => (
  <div className={`${styles.formGroup} ${parentDivClassnames}`}>
    {icon && icon}
    {type === "textarea" ? (
      <textarea
        placeholder={placeholder}
        required={required}
        name={name}
        value={value ?? ""}
        className={`${styles.formField} ${classNames} ${
          ableBoxShadow ? styles.boxShadow : ""
        }`}
        onChange={onChange}
      />
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        name={name}
        value={value ?? ""}
        className={`${styles.formField} ${classNames} ${
          ableBoxShadow ? styles.boxShadow : ""
        }`}
        onChange={onChange}
        {...extraProps}
      />
    )}
    {editIcon && editIcon}
  </div>
);

export default FormField;
