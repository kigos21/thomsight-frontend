import styles from "./CompanyDetails.module.scss";

import logo from "../../../assets/thomsight-logo.svg";
import PaddedContainer from "../../layout/PaddedContainer";
import { useCompanyData } from "../../../api/companyData.ts";

export default function CompanyDetails() {
  const { company, loading, error } = useCompanyData();

  //temporary placeholders
  if (loading) {
    return <div>Loading...</div>;
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
              <p>
                {firstLocation.city}, {firstLocation.state}
              </p>
            </div>
          ) : (
            <p>No location data available.</p>
          )}
        </div>
      </div>
    </PaddedContainer>
  );
}
