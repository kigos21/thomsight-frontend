import { ComponentProps, useState } from "react";
import styles from "./MultiSelect.module.scss";
import { IconFilter } from "@tabler/icons-react";
import { useEffect } from "react";

export interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps extends Omit<ComponentProps<"div">, "onChange"> {
  options: Option[];
  onChange: (selected: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  onChange,
  ...props
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions, onChange]);

  const toggleOption = (value: string) => {
    setSelectedOptions((prev) => {
      const newSelected = prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value];
      return newSelected;
    });
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
          {options.map((option) => (
            <label key={option.value}>
              <input
                type="checkbox"
                checked={selectedOptions.includes(option.value)}
                onChange={() => toggleOption(option.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
