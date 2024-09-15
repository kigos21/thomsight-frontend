import styles from "./CompanyDetails.module.scss";

import logo from "../../../assets/thomsight-logo.svg";
import PaddedContainer from "../../layout/PaddedContainer";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Company } from "../../../types/props";
import { getCompanyData } from "../../../api/companyData";

export default function CompanyDetails() {
  const { slug } = useParams<{ slug: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (slug) {
        try {
          const data = await getCompanyData(slug);
          setCompany(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching company data:", error);
          setError("Failed to fetch company data.");
          setLoading(false);
        }
      }
    };

    fetchCompanyData();
  }, [slug]);

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
