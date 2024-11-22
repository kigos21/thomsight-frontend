import styles from "./Footer.module.scss";
import srcLogo from "../../assets/thomsight-logo.svg";
import { IconMail } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <img
            src={srcLogo}
            alt="Thomsight logo"
            className={styles.imageHolder}
          />
          <p>
            Thomsight is a career support platform designed to help students
            explore opportunities, prepare for internships, and build successful
            careers.
          </p>
        </div>
        <div className={styles.middleLeftContainer}>
          <h4 className={styles.h4}>Explore</h4>
          <ul className={styles.ul}>
            <Link to="/terms-and-conditions" className={styles.links}>
              Terms and Conditions
            </Link>
          </ul>
          <ul className={styles.ul}>
            <Link to="/data-privacy" className={styles.links}>
              Data Privacy Policy
            </Link>
          </ul>
          <ul className={styles.ul}>
            <Link to="/faqs" className={styles.links}>
              FAQS
            </Link>
          </ul>
        </div>
        <div className={styles.middleRightContainer}>
          <h4 className={styles.h4}>Contact</h4>
          <div className={styles.iconEmailContainer}>
            <IconMail size={20} stroke={1.5} className={styles.icon} />
            <p>thomsightcics@gmail.com</p>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <h4 className={styles.h4}>Address</h4>
          <p>
            Blessed Pier Giorgio Frassati Building University of Santo Tomas,
            España Boulevard, Sampaloc, Manila 1008, Philippines
          </p>
        </div>
      </div>
      <div className={styles.border}></div>
      <div className={styles.underneathContainer}>
        <p>
          © 2024 Thomsight. All rights reserved. Designed and developed by the
          Thomsight Team.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
