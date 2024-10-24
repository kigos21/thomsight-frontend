import styles from "./SortButton.module.scss";
import { IconChevronDown } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { SortButtonProps } from "../../../types/props";

const SortButton = ({ onSort }: SortButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLButtonElement | null>(null);

  const handleClick = () => {
    setIsOpen((open) => !open);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node | null;
    if (
      dropdownRef.current &&
      target &&
      !dropdownRef.current.contains(target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleSortOptionClick = (option: string) => {
    onSort(option); // Pass the selected sort option to the parent component
    setIsOpen(false); // Close dropdown after selection
  };

  const menu: JSX.Element = (
    <div className={styles.menuContainer}>
      <div onClick={() => handleSortOptionClick("Token")}>Token</div>
      <div onClick={() => handleSortOptionClick("Status")}>Status</div>
      <div onClick={() => handleSortOptionClick("Expiration")}>Expiration</div>
    </div>
  );

  return (
    <div className={styles.buttonContainer}>
      <button
        type="button"
        className={styles.sortButton}
        onClick={handleClick}
        ref={dropdownRef}
      >
        Sort by
        <IconChevronDown size={20} stroke={1.5} className={styles.chevron} />
        {isOpen && menu}
      </button>
    </div>
  );
};

export default SortButton;
