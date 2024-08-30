import { FormFieldProps } from "../../types/props";

import styles from "./FormField.module.scss";

const FormField: React.FC<FormFieldProps> = ({
  icon,
  type,
  placeholder,
  required,
  extraProps,
}) => (
  <div className={styles.formGroup}>
    {icon}
    <input
      type={type}
      placeholder={placeholder}
      required={required}
      className={styles.formField}
      {...extraProps}
    />
  </div>
);

export default FormField;
