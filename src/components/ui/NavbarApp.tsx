import styles from "./NavbarApp.module.scss";
import logo from "../../assets/thomsight-logo.svg";

import PaddedContainer from "../layout/PaddedContainer";
import { IconUser, IconMenu2 } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { logout } from "../../api/authUser";
import Spinner from "./Spinner";

interface NavbarAppProps {
  links: JSX.Element[];
}

export default function NavbarApp({ links }: NavbarAppProps) {
  const [displayNav, setDisplayNav] = useState(false);
  const { user, loading } = useUser();

  const handleProfileClick = async () => {
    try {
      await logout();
      window.location.href = "http://localhost:5173/login";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <PaddedContainer classNames={styles.rootContainer}>
      {loading && (
        <Spinner message="Please wait while we render relevant data!" />
      )}
      <nav className={styles.container}>
        <div className={styles.brand}>
          <img className={styles.brandImage} src={logo} alt="Thomsight logo" />
          <div className={styles.brandTextContainer}>
            <h2 className={styles.brandText}>Thomsight</h2>
            <p className={styles.brandTextCics}>
              College of Information and Computing Sciences
            </p>
          </div>
        </div>

        <ul className={styles.navList}>
          {links.map((link, i) => (
            <li key={i}>{link}</li>
          ))}
        </ul>

        {/* Mobile Navigation Menu */}
        <div
          className={`${styles.mobileNavContainer} ${displayNav && styles.block}`}
        >
          <ul className={styles.mobileNavList}>
            {links.length > 0 &&
              links.map((link, i) => <li key={i}>{link}</li>)}
            <li>
              <NavLink to={"/"}>Profile</NavLink>
            </li>
          </ul>
        </div>

        {/* Hamburger button */}
        <button
          type="button"
          className={styles.hamburgerButton}
          onClick={() => setDisplayNav((state) => !state)}
        >
          <IconMenu2 size={30} stroke={1.5} className={styles.hamburgerIcon} />
        </button>

        {/* Profile button */}
        {/* <NavLink to={"/"} className={styles.profileGroup}>
          <span>{user ? user.name : "User"}</span>
          <IconUser size={30} stroke={1.5} />
        </NavLink> */}
        {/* <Link to={"/"} className={styles.profileGroup}>
          <span>{loading ? "Loading..." : user ? user.name : "User"}</span>
          <IconUser size={30} stroke={1.5} />
        </Link> */}
        <div className={styles.profileGroup} onClick={handleProfileClick}>
          <span>{loading ? "Loading..." : user ? user.name : "User"}</span>
          <IconUser size={30} stroke={1.5} />
        </div>
      </nav>
    </PaddedContainer>
  );
}
