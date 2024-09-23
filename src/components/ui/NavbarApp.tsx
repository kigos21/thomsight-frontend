import styles from "./NavbarApp.module.scss";
import logo from "../../assets/thomsight-logo.svg";

import PaddedContainer from "../layout/PaddedContainer";
import { IconUser, IconMenu2 } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useUserData } from "../../api/userData";

interface NavbarAppProps {
  links: JSX.Element[];
}

export default function NavbarApp({ links }: NavbarAppProps) {
  const [displayNav, setDisplayNav] = useState(false);
  const { user, loading } = useUserData();

  return (
    <PaddedContainer classNames={styles.rootContainer}>
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
            {links.map((link, i) => (
              <li key={i}>{link}</li>
            ))}
            <li>
              <Link to={"/"}>Profile</Link>
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
        <Link to={"/"} className={styles.profileGroup}>
          <span>{loading ? "Loading..." : user ? user.name : "User"}</span>
          <IconUser size={30} stroke={1.5} />
        </Link>
      </nav>
    </PaddedContainer>
  );
}
