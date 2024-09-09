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
  editIcon,
}) => (
  <div className={styles.formGroup}>
    {icon && icon}
    {type === "textarea" ? (
      <textarea
        placeholder={placeholder}
        required={required}
        value={value}
        className={`${styles.formField} ${classNames}`}
      />
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        className={`${styles.formField} ${classNames}`}
        {...extraProps}
      />
    )}
    {editIcon && editIcon}
  </div>
);

export default FormField;
