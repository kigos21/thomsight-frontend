import styles from "./CompanyDetails.module.scss";

import logo from "../../../assets/thomsight-logo.svg";
import PaddedContainer from "../../layout/PaddedContainer";

export default function CompanyDetails() {
  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img src={logo} alt="Logo" />
        </div>

        <div className={styles.detailsHolder}>
          <p className={styles.companyName}>Company Name</p>
          <p>Company Email</p>
          <p>Company Location</p>
        </div>
      </div>
    </PaddedContainer>
  );
}
