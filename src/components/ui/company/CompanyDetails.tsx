import styles from "./CompanyDetails.module.scss";

import logo from "../../../assets/thomsight-logo.svg";
import PaddedContainer from "../../layout/PaddedContainer";
import { useCompanyData } from "../../../api/companyData.ts";
import Spinner from "../Spinner.tsx";

export default function CompanyDetails() {
  const { company, loading, error } = useCompanyData();

  //temporary placeholders
  if (loading) {
    return <Spinner message="Please wait while we render relevant data!" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!company) {
    return <div>No company found.</div>;
  }

  const firstLocation =
    company.locations.length > 0 ? company.locations[0] : null;

  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img src={logo} alt="Logo" />
        </div>

        <div className={styles.detailsHolder}>
          <p className={styles.companyName}>{company.name}</p>
          <p>{company.email}</p>
          {/* temporary location placeholder */}
          {firstLocation ? (
            <div>
              <p>{firstLocation.address}</p>
            </div>
          ) : (
            <p>No location data available.</p>
          )}
        </div>
      </div>
    </PaddedContainer>
  );
}
