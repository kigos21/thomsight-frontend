import { FormFieldProps } from "../../types/props";

import styles from "./FormField.module.scss";

const FormField: React.FC<FormFieldProps> = ({
  icon,
  type,
  placeholder,
  required,
  extraProps,
  classNames,
  editIcon,
}) => (
  <div className={styles.formGroup}>
    {icon && icon}
    <input
      type={type}
      placeholder={placeholder}
      required={required}
      className={`${styles.formField} ${classNames}`}
      {...extraProps}
    />
    {editIcon && editIcon}
  </div>
);

export default FormField;
