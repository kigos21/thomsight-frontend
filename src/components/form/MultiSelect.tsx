import { useState } from "react";

export interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps extends HTMLDivElement {
  options: Option[];
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (value: string) => {
    setSelectedOptions((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <div>
      <div onClick={() => setIsOpen(!isOpen)}>
        {selectedOptions.length > 0
          ? selectedOptions.join(", ")
          : "Select options"}
      </div>
      {isOpen && (
        <div
          style={{
            border: "1px solid #ccc",
            position: "absolute",
            background: "#fff",
          }}
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
