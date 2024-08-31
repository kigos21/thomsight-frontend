import logo from "../../../assets/thomsight-logo.svg";
import PaddedContainer from "../../layout/PaddedContainer";
import styles from "./CompanyDetails.module.scss";

export default function CompanyDetails() {
  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      <div className={styles.container}>
        <div className={styles.imageHolder}>
          <img src={logo} alt="Logo" className={styles.logo} />
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
