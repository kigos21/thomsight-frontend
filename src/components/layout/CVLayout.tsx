import styles from "./CVLayout.module.scss";

import { Link, Outlet } from "react-router-dom";
import PaddedContainer from "./PaddedContainer";

const CVLayout = () => {
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

      {/* Content */}
      <PaddedContainer classNames={styles.main}>
        <Outlet />
      </PaddedContainer>
    </div>
  );
};

export default CVLayout;
