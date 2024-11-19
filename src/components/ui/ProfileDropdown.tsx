import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./ProfileDropdown.module.scss";
import { IconUser } from "@tabler/icons-react";
import { useNav } from "../../contexts/NavContext";
import axiosInstance from "../../services/axiosInstance";
import { toast } from "react-toastify";
import { IconBell } from "@tabler/icons-react";
import { useUser } from "../../contexts/UserContext";

interface ProfileDropdownProps {
  username: string;
  onLogout: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void>;
}

const { user } = useUser();

const { setDisplayNav } = useNav();
const [unreadNotifications, setUnreadNotifications] = useState<number>(0);

const fetchUnreadNotifications = async () => {
  if (user?.role === "Rep") {
    try {
      const response = await axiosInstance.get("/api/notification-number");
      setUnreadNotifications(response.data);
    } catch (error) {
      toast.error("Failed to fetch notifications.");
      console.error(error);
    }
  }
};
useEffect(() => {
  fetchUnreadNotifications();
}, [user]);

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
    <div className={styles.container}>
      {user?.role === "Rep" && (
        <NavLink
          to="/notifications"
          key="notifications"
          className={({ isActive }) => `
            ${isActive ? styles.active : ""} 
            ${styles.notificationContainer}
          `}
          onClick={() => {
            setDisplayNav(false);
            setUnreadNotifications(0);
          }}
        >
          <IconBell className={styles.iconBell} size={30} />
          {unreadNotifications > 0 && (
            <span className={styles.notificationBadge}>
              {unreadNotifications}
            </span>
          )}
        </NavLink>
      )}

      <div className={styles.profileDropdown} ref={dropdownRef}>
        <button className={styles.profileGroup} onClick={toggleDropdown}>
          <span className={styles.username}>
            {username.length > 40 ? `${username.slice(0, 36)}...` : username}
          </span>
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
            <button
              onClick={(e) => onLogout(e)}
              className={styles.dropdownItem}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDropdown;
