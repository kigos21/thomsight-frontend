import styles from "./NavbarApp.module.scss";
import logo from "../../assets/thomsight-logo.svg";

import PaddedContainer from "../layout/PaddedContainer";
import { IconMenu2 } from "@tabler/icons-react";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { logout } from "../../api/authUser";
import Spinner from "./Spinner";
import ProfileDropdown from "./ProfileDropdown";
import { useNav } from "../../contexts/NavContext";

interface NavbarAppProps {
  links: JSX.Element[];
}

export default function NavbarApp({ links }: NavbarAppProps) {
  const { displayNav, setDisplayNav } = useNav();
  const { user, loading, setUser } = useUser();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

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
              <NavLink
                to={"/notifications"}
                onClick={() => setDisplayNav(false)}
              >
                Notifications
              </NavLink>
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
        <ProfileDropdown
          username={user ? user.name : "User"}
          onLogout={handleProfileClick}
        />

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
