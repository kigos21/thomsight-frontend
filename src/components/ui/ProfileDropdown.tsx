import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./ProfileDropdown.module.scss";
import { IconUser } from "@tabler/icons-react";

interface ProfileDropdownProps {
  username: string;
  onLogout: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void>;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  username,
  onLogout,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className={styles.profileDropdown} ref={dropdownRef}>
      <button className={styles.profileGroup} onClick={toggleDropdown}>
        <span className={styles.username}>{username}</span>
        <IconUser className={styles.icon} />
      </button>
      {isOpen && (
        <div className={styles.dropdownContent}>
          <Link
            to="/profile"
            onClick={(e) => {
              e.stopPropagation();
              toggleDropdown();
            }}
            className={styles.dropdownItem}
          >
            Profile
          </Link>
          <button onClick={(e) => onLogout(e)} className={styles.dropdownItem}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
