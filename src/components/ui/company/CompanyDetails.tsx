import styles from "./CompanyDetails.module.scss";

import logo from "../../../assets/thomsight-logo.svg";
import PaddedContainer from "../../layout/PaddedContainer";
import Spinner from "../Spinner.tsx";
import { useCompanies } from "../../../contexts/CompaniesContext.tsx";
import { useParams } from "react-router-dom";

export default function CompanyDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { getCompanyBySlug } = useCompanies();
  const company = getCompanyBySlug(slug as string);

  if (!company) {
    return <div></div>;
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
