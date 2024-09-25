import { ComponentProps, useState } from "react";
import styles from "./MultiSelect.module.scss";
import { IconFilter } from "@tabler/icons-react";

export interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps extends ComponentProps<"div"> {
  options: Option[];
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, ...props }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (value: string) => {
    setSelectedOptions((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <div {...props} tabIndex={0} onClick={() => setIsOpen((state) => !state)}>
      <IconFilter className={styles.iconFilter} />
      <p>Job Classifications</p>

      {isOpen && (
        <div
          className={styles.selectWindow}
          onClick={(e) => e.stopPropagation()}
        >
          <label>
            <input type="checkbox" name="" id="" />
            Test
          </label>
          <label>
            <input type="checkbox" name="" id="" />
            Test
          </label>
          <label>
            <input type="checkbox" name="" id="" />
            Test
          </label>
          <label>
            <input type="checkbox" name="" id="" />
            Test
          </label>
          <label>
            <input type="checkbox" name="" id="" />
            Test
          </label>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
