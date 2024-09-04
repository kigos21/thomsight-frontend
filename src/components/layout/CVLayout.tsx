import styles from "./CVLayout.module.scss";

import { Link, Outlet, useLocation } from "react-router-dom";
import PaddedContainer from "./PaddedContainer";
import Button from "../ui/Button";
import {
  IconFileCheck,
  IconFileExport,
  IconHelp,
  IconHourglassHigh,
  IconList,
  IconOutbound,
} from "@tabler/icons-react";

const CVLayout = () => {
  const location = useLocation();

  const helpText = "Lorem ipsum Lorem ipsum Lorem ipsum";

  return (
    <div className={styles.rootLayout}>
      <div className={styles.sideNav}>
        <PaddedContainer>
          <ul className={styles.navList}>
            <li>
              <Link to="#">Listing</Link>
            </li>
            <li>
              <Link to="#">Pending</Link>
            </li>
            <li>
              <Link to="#">To Review</Link>
            </li>
            <li>
              <Link to="#">Reviewed</Link>
            </li>
            <li>
              <Link to="#">My Requests</Link>
            </li>
          </ul>
        </PaddedContainer>
      </div>

      <div className={styles.bottomNav}>
        <ul className={styles.bottomNavList}>
          <li>
            <Link to="#">
              <IconList size={27} stroke={2} className={styles.bottomNavIcon} />
            </Link>
          </li>
          <li>
            <Link to="#">
              <IconHourglassHigh stroke={2} className={styles.bottomNavIcon} />
            </Link>
          </li>
          <li>
            <Link to="#">
              <IconFileExport stroke={2} className={styles.bottomNavIcon} />
            </Link>
          </li>
          <li>
            <Link to="#">
              <IconFileCheck stroke={2} className={styles.bottomNavIcon} />
            </Link>
          </li>
          <li>
            <Link to="#">
              <IconOutbound stroke={2} className={styles.bottomNavIcon} />
            </Link>
          </li>
        </ul>
      </div>

      <PaddedContainer classNames={styles.main}>
        <header className={styles.header}>
          <h1>
            CV and Resume Peer Review Center&nbsp;
            <IconHelp className={styles.helpIcon} title={helpText} />
          </h1>
          {location.pathname === "/cv-review" && (
            <Button color={"primary"} roundness={"rounded"}>
              Post CV
            </Button>
          )}
        </header>
        {/* MAIN CONTENT */}
        <Outlet />
      </PaddedContainer>
    </div>
  );
};

export default CVLayout;
