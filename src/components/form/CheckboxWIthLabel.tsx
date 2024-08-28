import { Link } from "react-router-dom";

import styles from "./CheckboxWithLabel.module.scss";

interface CheckboxWithLabelProps {
  id: string;
  label: string;
  linkText: string;
  linkHref: string;
  required: true | false;
}

const CheckboxWithLabel: React.FC<CheckboxWithLabelProps> = ({
  id,
  label,
  linkText,
  linkHref,
  required,
}) => (
  <div className={styles.checkGroup}>
    <input type="checkbox" id={id} required={required} />
    <label htmlFor={id}>
      {label} <Link to={linkHref}>{linkText}</Link>
    </label>
  </div>
);

export default CheckboxWithLabel;
