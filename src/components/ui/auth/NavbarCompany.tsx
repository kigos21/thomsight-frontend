import PaddedContainer from "../../layout/PaddedContainer";
import styles from "./NavbarCompany.module.scss";

interface NavbarCompanyProps {
  elements: React.ReactNode[];
}

export default function NavbarCompany({ elements }: NavbarCompanyProps) {
  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      <nav className={styles.container}>
        <div className={styles.elementContainer}>{elements}</div>
        <div className={styles.underline}></div>
      </nav>
    </PaddedContainer>
  );
}
