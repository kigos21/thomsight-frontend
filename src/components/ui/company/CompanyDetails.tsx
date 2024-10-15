import styles from "./CompanyDetails.module.scss";

import logo from "../../../assets/thomsight-logo.svg";
import PaddedContainer from "../../layout/PaddedContainer";
import { useCompanies } from "../../../contexts/CompaniesContext.tsx";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { IconChevronDown, IconEdit } from "@tabler/icons-react";

export default function CompanyDetails() {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { slug } = useParams<{ slug: string }>();
  const { getCompanyBySlug } = useCompanies();
  const company = getCompanyBySlug(slug as string);
  const location = useLocation();

  const [isEditName, setIsEditName] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);

  const [companyName, setCompanyName] = useState(company!.name);
  const [companyEmail, setCompanyEmail] = useState(company!.email);

  const [originalCompanyName, setOriginalCompanyName] = useState(company!.name);
  const [originalCompanyEmail, setOriginalCompanyEmail] = useState(
    company!.email
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSaveUpdates = () => {
    setIsEditName(false);
    setIsEditEmail(false);
  };

  if (!company) {
    return <div></div>;
  }

  const firstLocation =
    company.locations!.length > 0 ? company.locations![0] : null;

  /**
   * We want to separate the rendering of edit options away from the read-only.
   * Therefore, return the editable components if pathname is in /.../manage/*.
   * Otherwise, return with read-only component
   */

  if (location.pathname.includes("/manage/")) {
    return (
      <PaddedContainer classNames={styles.paddedContainer}>
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <img src={logo} alt="Logo" />
            <div className={styles.positionedButton} ref={dropdownRef}>
              <button onClick={() => setIsDropdownOpen((state) => !state)}>
                <IconChevronDown stroke={1.5} size={18} />
              </button>
              {isDropdownOpen && (
                <div className={styles.dropdownContent}>
                  <button
                    onClick={() => console.log("You clicked on View Photo!")}
                    className={styles.dropdownItem}
                  >
                    View Photo
                  </button>
                  <button
                    onClick={() => console.log("You clicked on Change Photo!")}
                    className={styles.dropdownItem}
                  >
                    Change Photo
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className={styles.detailsHolder}>
            {/* Company Name */}
            <div className={styles.sectionHeading}>
              {isEditName ? (
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className={styles.inputTextCompanyName}
                />
              ) : (
                <p className={styles.companyName}>{companyName}</p>
              )}
              {isEditName ? (
                <div className={styles.saveAndCancelButtons}>
                  <button
                    className={styles.cancelButton}
                    onClick={() => {
                      setIsEditName(false);
                      setCompanyName(originalCompanyName);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className={styles.saveButton}
                    onClick={handleSaveUpdates}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <button
                  className={styles.headingEditButton}
                  onClick={() => {
                    setOriginalCompanyName(companyName);
                    setIsEditName(true);
                  }}
                >
                  <IconEdit className={styles.iconEdit} />
                </button>
              )}
            </div>

            {/* Company Email */}
            <div className={styles.sectionHeading}>
              {isEditEmail ? (
                <input
                  type="text"
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                  className={styles.inputTextEmail}
                />
              ) : (
                <p>{companyEmail}</p>
              )}

              {isEditEmail ? (
                <div className={styles.saveAndCancelButtons}>
                  <button
                    className={styles.cancelButton}
                    onClick={() => {
                      setIsEditEmail(false);
                      setCompanyEmail(originalCompanyEmail);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className={styles.saveButton}
                    onClick={handleSaveUpdates}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <button
                  className={styles.headingEditButton}
                  onClick={() => {
                    setOriginalCompanyEmail(companyEmail);
                    setIsEditEmail(true);
                  }}
                >
                  <IconEdit className={styles.iconEdit} />
                </button>
              )}
            </div>

            {/* Temporary location placeholder */}
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

    /**
     * Else, return without the edit options.
     */
  } else {
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
}
