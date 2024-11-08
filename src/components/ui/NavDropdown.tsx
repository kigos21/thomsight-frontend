import { Link } from "react-router-dom";
import styles from "./NavDropdown.module.scss";
import { IconChevronDown } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

interface NavDropdownProps {
  items: Item[];
  label: string;
}

interface Item {
  label: string;
  link: string;
}

const NavDropdown: React.FunctionComponent<NavDropdownProps> = ({
  label,
  items,
}) => {
  const [showWindow, setShowWindow] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowWindow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className={styles.dropdownContainer} ref={dropdownRef}>
        <p onClick={() => setShowWindow((state) => !state)}>
          {label} <IconChevronDown />
        </p>

        <div
          className={`${styles.dropdownContent} ${showWindow ? "" : styles.hidden}`}
        >
          {items.map((item) => (
            <Link
              key={item.label + item.link}
              to={item.link}
              onClick={(e) => {
                e.stopPropagation();
                setShowWindow(false);
              }}
              className={styles.dropdownItem}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default NavDropdown;
