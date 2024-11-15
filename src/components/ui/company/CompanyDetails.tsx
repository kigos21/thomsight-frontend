import styles from "./CompanyDetails.module.scss";

// import logo from "../../../assets/thomsight-logo.svg";
import PaddedContainer from "../../layout/PaddedContainer";
import { useCompanies } from "../../../contexts/CompaniesContext.tsx";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { IconChevronDown, IconEdit } from "@tabler/icons-react";
import { updateCompanyDetails } from "../../../api/companyCRUD.ts";
import Spinner from "../Spinner.tsx";
import ErrorPage from "../../../pages/ErrorPage.tsx";
import ChangePhotoPopup from "../ChangePhotoPopup.tsx";
import { toast } from "react-toastify";

export default function CompanyDetails() {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { slug } = useParams<{ slug: string }>();
  const { getCompanyBySlug, updateCompany, loading, error } = useCompanies();
  const company = getCompanyBySlug(slug as string);
  const location = useLocation();
  const [logo, setLogo] = useState<string>("");

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

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  useEffect(() => {
    if (company) {
      setCompanyName(company!.name || "");
      setCompanyEmail(company!.email || "");
      setLocations(company!.locations || []);
      setLogo(company!.image || "");
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (isEditName && companyName.trim() === "") {
      toast.error("Company name cannot be blank");
      return;
    }

    if (isEditEmail && companyEmail.trim() === "") {
      toast.error("Company email cannot be blank");
      return;
    }

    if (isEditEmail && !emailRegex.test(companyEmail)) {
      toast.error("Invalid email format");
      return;
    }

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
      if (isEditName && isEditEmail) {
        toast.success("Updated details successfully");
      } else if (isEditName) {
        toast.success("Updated company name successfully");
      } else if (isEditEmail) {
        toast.success("Updated company email successfully");
      }
    } catch (error) {
      console.error("Error updating company details:", error);
    } finally {
      setIsUpdating("");
      setIsEditName(false);
      setIsEditEmail(false);
    }
  };

  const handleViewPhoto = () => {
    setIsImageViewerOpen(true);
  };

  const handleCloseImageViewer = () => {
    setIsImageViewerOpen(false);
  };

  /**
   * We want to separate the rendering of edit options away from the read-only.
   * Therefore, return the editable components if pathname is in /.../manage/*.
   * Otherwise, return with read-only component
   */

  if (location.pathname.includes("/manage/")) {
    return (
      <PaddedContainer classNames={styles.paddedContainer}>
        {isUpdating && <Spinner message={isUpdating} />}
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <img src={logo} alt="Logo" />
            <div className={styles.positionedButton} ref={dropdownRef}>
              <button
                onClick={() => {
                  setIsDropdownOpen((state) => !state);
                }}
              >
                <IconChevronDown stroke={1.5} size={18} />
              </button>
              {isDropdownOpen && (
                <div className={styles.dropdownContent}>
                  <button
                    onClick={handleViewPhoto}
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
                <p>{companyEmail ?? "No email set"}</p>
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
        />
        {isImageViewerOpen && (
          <div className={styles.overlay} onClick={handleCloseImageViewer}>
            <div
              className={styles.imageViewer}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image itself
            >
              <img src={logo} alt="Company Logo" className={styles.image} />
              <span
                className={styles.closeButton}
                onClick={handleCloseImageViewer}
              >
                &times; {/* "X" button */}
              </span>
            </div>
          </div>
        )}
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
            <p className={styles.companyName}>
              {company.name || "No company name set"}
            </p>
            <p>{company.email || "No contact email set"}</p>
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
                <p>No locations available.</p>
              )}
            </div>
          </div>
        </div>
      </PaddedContainer>
    );
  }
}
