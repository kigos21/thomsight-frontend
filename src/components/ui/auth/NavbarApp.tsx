import logo from "../../../assets/thomsight-logo.svg";
import PaddedContainer from "../../layout/PaddedContainer";
import styles from "./NavbarApp.module.scss";
import { IconUser } from "@tabler/icons-react";

interface NavbarAppProps {
  elements: React.ReactNode[];
}

export default function NavbarApp({ elements }: NavbarAppProps) {
  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      <nav className={styles.container}>
        <div className={styles.titleContainer}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <h1 className={styles.heading}>Thomsight</h1>
        </div>
        <div className={styles.elementContainer}>{elements}</div>
        <div className={styles.profileContainer}>
          <a href="/" className={styles.profileLink}>
            <IconUser className={styles.profileIcon} />
          </a>
        </div>
      </nav>
    </PaddedContainer>
  );
}
