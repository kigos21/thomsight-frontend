import { Link } from "react-router-dom";
import styles from "./NavDropdown.module.scss";
import { IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";

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

  return (
    <>
      <div className={styles.dropdownContainer}>
        <p onClick={() => setShowWindow((state) => !state)}>
          {label} <IconChevronDown />
        </p>

        <div
          className={`${styles.windowContainer} ${showWindow ? "" : styles.hidden}`}
        >
          {items.map((item) => (
            <Link
              key={item.label + item.link}
              to={item.link}
              onClick={(e) => {
                e.stopPropagation();
                setShowWindow(false);
              }}
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
