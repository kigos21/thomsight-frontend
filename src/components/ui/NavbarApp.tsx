import styles from "./NavbarApp.module.scss";
import logo from "../../assets/thomsight-logo.svg";

import PaddedContainer from "../layout/PaddedContainer";
import { IconBell, IconMenu2 } from "@tabler/icons-react";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { logout } from "../../api/authUser";
import Spinner from "./Spinner";
import ProfileDropdown from "./ProfileDropdown";
import { useNav } from "../../contexts/NavContext";
import axiosInstance from "../../services/axiosInstance";
import { toast } from "react-toastify";

interface NavbarAppProps {
  links: JSX.Element[];
}

function getInitials(input: string): string {
  const trimmedInput = input.trim(); // Remove extra spaces
  const words = trimmedInput.split(/\s+/); // Split by spaces

  if (words.length === 1) {
    // If only one word, take the first two letters
    return words[0].slice(0, 2).toUpperCase();
  }

  // If more than one word, take the first letter of the first two words
  return words[0][0]?.toUpperCase() + (words[1]?.[0]?.toUpperCase() || "");
}

export default function NavbarApp({ links }: NavbarAppProps) {
  const { displayNav, setDisplayNav } = useNav();
  const { user, loading, setUser } = useUser();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        setDisplayNav(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setLogoutLoading(true);

    try {
      await logout();
      setUser(null);
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <PaddedContainer classNames={styles.rootContainer}>
      {loading && (
        <Spinner message="Please wait while we render relevant data!" />
      )}
      {logoutLoading && <Spinner message="Logging out..." />}
      <nav className={styles.container}>
        <Link to={"/companies"}>
          <div className={styles.brand}>
            <img
              className={styles.brandImage}
              src={logo}
              alt="Thomsight logo"
            />
            <div className={styles.brandTextContainer}>
              <h2 className={styles.brandText}>Thomsight</h2>
              <p className={styles.brandTextCics}>
                College of Information and Computing Sciences
              </p>
            </div>
          </div>
        </Link>

        <ul className={styles.navList}>
          {links.map((link, i) => (
            <li key={i}>{link}</li>
          ))}
        </ul>

        {/* Mobile Navigation Menu */}
        <div
          ref={mobileNavRef}
          className={`${styles.mobileNavContainer} ${displayNav && styles.block}`}
        >
          <ul className={styles.mobileNavList}>
            {links.length > 0 &&
              links.map((link, i) => <li key={i}>{link}</li>)}
            <li>
              {user?.role == "Rep" && (
                <NavLink
                  to={"/notifications"}
                  onClick={() => setDisplayNav(false)}
                >
                  Notifications
                </NavLink>
              )}
            </li>
            <li>
              <NavLink to={"/profile"} onClick={() => setDisplayNav(false)}>
                Profile
              </NavLink>
            </li>
            <li>
              <button onClick={(e) => handleProfileClick(e)}>LOGOUT</button>
            </li>
          </ul>
        </div>

        {/* Hamburger button */}
        <button
          type="button"
          className={styles.hamburgerButton}
          onClick={() =>
            displayNav ? setDisplayNav(false) : setDisplayNav(true)
          }
          ref={hamburgerRef}
        >
          <IconMenu2 size={30} stroke={1.5} className={styles.hamburgerIcon} />
        </button>

        {/* Profile button */}
        <div className={styles.notifAndProfileContainer}>
          {user?.role == "Rep" && (
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

          <ProfileDropdown
            username={user ? getInitials(user.name) : "User"}
            onLogout={handleProfileClick}
          />
        </div>

        {/* <Link to={"/"} className={styles.profileGroup}>
          <span>{loading ? "Loading..." : user ? user.name : "User"}</span>
          <IconUser size={30} stroke={1.5} />
        </Link> */}
        {/* <div className={styles.profileGroup} onClick={handleProfileClick}>
          <span>{loading ? "Loading..." : user ? user.name : "User"}</span>
          <IconUser size={30} stroke={1.5} />
        </div> */}
      </nav>
    </PaddedContainer>
  );
}
