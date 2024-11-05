import styles from "./CompanyDetails.module.scss";

import logo from "../../../assets/thomsight-logo.svg";
import PaddedContainer from "../../layout/PaddedContainer";
import { useCompanies } from "../../../contexts/CompaniesContext.tsx";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { IconChevronDown, IconEdit } from "@tabler/icons-react";
import { updateCompanyDetails } from "../../../api/companyCRUD.ts";
import Spinner from "../Spinner.tsx";
import ErrorPage from "../../../pages/ErrorPage.tsx";
import SuccessMessage from "../../form/SuccessMessage.tsx";
import ValidationError from "../../form/ValidationError.tsx";
import ChangePhotoPopup from "../ChangePhotoPopup.tsx";

export default function CompanyDetails() {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { slug } = useParams<{ slug: string }>();
  const { getCompanyBySlug, updateCompany, loading, error } = useCompanies();
  const company = getCompanyBySlug(slug as string);
  const location = useLocation();

  const [isEditName, setIsEditName] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);

  const [companyName, setCompanyName] = useState(company!.name || "");
  const [companyEmail, setCompanyEmail] = useState(company!.email || "");

  const [originalCompanyName, setOriginalCompanyName] = useState(
    company!.name || ""
  );
  const [originalCompanyEmail, setOriginalCompanyEmail] = useState(
    company!.email || ""
  );
  const [locations, setLocations] = useState(company?.locations || []);

  const [isUpdating, setIsUpdating] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [detailsError, setDetailsError] = useState<string>("");

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (company) {
      setCompanyName(company!.name || "");
      setCompanyEmail(company!.email || "");
      setLocations(company!.locations || []);
    }
  }, [company]);

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

  if (loading)
    return <Spinner message="Please wait while we render relevant data!" />;
  if (error) return <ErrorPage />;
  if (!company) return <div></div>;
  // if (!user || user.role !== "Rep" || company?.posted_by !== user.id) {
  //   return <ErrorPage />;
  // }

  const handleSaveUpdates = async () => {
    let isValid = true;

    setSuccess("");
    setDetailsError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (companyName.trim() === "" || companyEmail.trim() === "") {
      setDetailsError("Details cannot be blank");
      isValid = false;
    }

    if (!emailRegex.test(companyEmail)) {
      setDetailsError("Invalid email format");
      isValid = false;
    }

    if (!isValid) return;

    setIsUpdating("Updating details...");

    try {
      if (!slug) {
        throw new Error("Slug is undefined");
      }

      const updatedData = {
        name: companyName,
        email: companyEmail,
      };

      await updateCompanyDetails(slug, updatedData);

      const updatedCompany = {
        ...company,
        name: companyName,
        email: companyEmail,
      };
      updateCompany(updatedCompany);
      setSuccess("Updated details successfully");
    } catch (error) {
      console.error("Error updating company details:", error);
    } finally {
      setIsUpdating("");
      setIsEditName(false);
      setIsEditEmail(false);
    }
  };

  /**
   * We want to separate the rendering of edit options away from the read-only.
   * Therefore, return the editable components if pathname is in /.../manage/*.
   * Otherwise, return with read-only component
   */

  if (location.pathname.includes("/manage/")) {
    return (
      <PaddedContainer classNames={styles.paddedContainer}>
        {success && <SuccessMessage message={success} />}
        {isUpdating && <Spinner message={isUpdating} />}
        {detailsError && <ValidationError message={detailsError} />}
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
                    onClick={() => setIsPopupOpen(true)}
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
                    setDetailsError("");
                    setSuccess("");
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
                    setDetailsError("");
                    setSuccess("");
                  }}
                >
                  <IconEdit className={styles.iconEdit} />
                </button>
              )}
            </div>

            <div className={styles.locationsContainer}>
              {locations.length > 0 ? (
                <p className={styles.locations}>
                  {locations.map((location, index) => (
                    <span key={index}>
                      {location.address}
                      {index < locations.length - 1 && " | "}
                    </span>
                  ))}
                </p>
              ) : (
                <p>No location data available.</p>
              )}
            </div>
          </div>
        </div>
        <ChangePhotoPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onSave={(file) => console.log("Selected file:", file)}
        />
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
            <div className={styles.locationsContainer}>
              {locations.length > 0 ? (
                <p className={styles.locations}>
                  {locations.map((location, index) => (
                    <span key={index}>
                      {location.address}
                      {index < locations.length - 1 && " | "}
                    </span>
                  ))}
                </p>
              ) : (
                <p>No location data available.</p>
              )}
            </div>
          </div>
        </div>
      </PaddedContainer>
    );
  }
}
