import styles from "./ButtonWithDropdown.module.scss";

import { IconChevronDown } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const RegisterWithDropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLButtonElement | null>(null);

  const handleClick = () => {
    setIsOpen((open) => !open);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node | null;

    // Check if the click is outside of the dropdown
    if (
      dropdownRef.current &&
      target &&
      !dropdownRef.current.contains(target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Attach event listener to document
    document.addEventListener("click", handleClickOutside, true);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const menu: JSX.Element = (
    <div className={styles.menuContainer}>
      <Link to={"/register/token"}>Register&nbsp;a&nbsp;Company</Link>
      <Link to={"/terms-and-conditions"}>Terms&nbsp;and&nbsp;Conditions</Link>
      <Link to={"/data-privacy"}>Data&nbsp;Privacy</Link>
    </div>
  );

  return (
    <div className={styles.buttonContainer}>
      <Link to={"/register"}>
        <button type="button" className={styles.button}>
          Register
        </button>
      </Link>
      <button
        type="button"
        className={styles.sideDropdown}
        onClick={handleClick}
        ref={dropdownRef}
      >
        <IconChevronDown size={25} stroke={1.5} className={styles.chevron} />
        {isOpen && menu}
      </button>
    </div>
  );
};

export default RegisterWithDropdown;
