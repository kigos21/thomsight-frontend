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
}) => (
  <div className={`${styles.formGroup} ${parentDivClassnames}`}>
    {icon && icon}
    {type === "textarea" ? (
      <textarea
        placeholder={placeholder}
        required={required}
        name={name}
        value={value}
        className={`${styles.formField} ${classNames}`}
        onChange={onChange}
      />
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        name={name}
        value={value}
        className={`${styles.formField} ${classNames}`}
        onChange={onChange}
        {...extraProps}
      />
    )}
    {editIcon && editIcon}
  </div>
);

export default FormField;
