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
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  onChange,
  searchQuery,
  onSearchQueryChange,
  setCurrentPage: setCompanyPage,
  ...props
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOptions.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
    setCompanyPage(1);
  }, [filteredOptions.length]);

  const paginatedOptions = filteredOptions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div {...props} tabIndex={0} onClick={() => setIsOpen((state) => !state)}>
      <IconFilter className={styles.iconFilter} />
      <input
        type="text"
        placeholder="Job Classifications"
        className={styles.searchBox}
        onChange={(e) => onSearchQueryChange(e.target.value)}
      />

      {isOpen && (
        <div
          className={styles.selectWindow}
          onClick={(e) => e.stopPropagation()}
        >
          {paginatedOptions.map((option) => (
            <label key={option.value}>
              <input
                type="checkbox"
                checked={selectedOptions.includes(option.value)}
                onChange={() => toggleOption(option.value)}
              />
              {option.label}
            </label>
          ))}

          <div className={styles.paginationControls}>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={styles.paginationButton}
            >
              Previous
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={styles.paginationButton}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
