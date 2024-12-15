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
import { Company, Location } from "../../../types/types.ts";
import srcLogo from "../../../assets/no-image.png";
import EditCompanyNameEmailPopup from "./EditCompanyNameEmailPopup";
import ImageGalleryPopup from "./ImageGalleryPopup.tsx";

export default function CompanyDetails() {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { slug } = useParams<{ slug: string }>();
  const { getCompanyBySlug, updateCompany, loading, error } = useCompanies();
  const location = useLocation();
  const [logo, setLogo] = useState<string>("");
  const [company, setCompany] = useState<Company | null>(null);

  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");

  const [locations, setLocations] = useState<Location[]>([]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupInfoOpen, setIsPopupInfoOpen] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [isGalleryOpen, setIsImageGalleryOpen] = useState(false);

  useEffect(() => {
    if (slug) {
      const fetchedCompany = getCompanyBySlug(slug);
      if (fetchedCompany) {
        setCompany(fetchedCompany);
        setCompanyName(fetchedCompany.name || "");
        setCompanyEmail(fetchedCompany.email || "");
        setLocations(fetchedCompany.locations || []);
        setLogo(fetchedCompany.image || "");
      }
    }
  }, [slug, getCompanyBySlug]);

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

  const handleSaveUpdates = async (name: string, email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name.trim() === "") {
      toast.error("Company name cannot be blank");
      return;
    }

    if (email.trim() === "") {
      toast.error("Company email cannot be blank");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return;
    }

    try {
      if (!slug) {
        throw new Error("Slug is undefined");
      }

      const updatedData = {
        name,
        email,
      };

      await updateCompanyDetails(slug, updatedData);

      const updatedCompany = {
        ...company,
        name,
        email,
      };
      updateCompany(updatedCompany);
      toast.success("Updated details successfully");
    } catch (error) {
      console.error("Error updating company details:", error);
    } finally {
      setCompanyName(name);
      setCompanyEmail(email);
      setIsPopupOpen(false);
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

  const handleEditInfo = () => {
    setIsPopupInfoOpen(true);
  };

  const handleImagePopup = () => {
    setIsImageGalleryOpen(true);
  };

  // const handleSave = async (name: string, email: string) => {
  //   // Logic to save the updated name and email
  //   setCompanyName(name);
  //   setCompanyEmail(email);
  //   setIsPopupOpen(false);
  // };

  if (location.pathname.includes("/manage/")) {
    return (
      <PaddedContainer classNames={styles.paddedContainer}>
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            {logo !== "http://localhost:8000/storage/uploads/companies" ? (
              <img src={logo} alt="Logo" />
            ) : (
              <img src={srcLogo} alt={"No image"} />
            )}
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
              <div className={styles.companyInfo}>
                <p className={styles.companyName}>{companyName}</p>
                <div>
                  <button
                    className={styles.editButton}
                    onClick={handleEditInfo}
                  >
                    <IconEdit className={styles.iconEdit} />
                    Edit Name & Email
                  </button>
                  <button
                    className={styles.editButton}
                    onClick={handleImagePopup}
                    style={{ marginTop: "0.5rem" }}
                  >
                    <IconEdit className={styles.iconEdit} />
                    Manage Image Gallery
                  </button>
                </div>
              </div>
            </div>

            {/* Company Email */}
            <div className={styles.sectionHeading}>
              <p
                className={styles.email}
                title={
                  companyEmail && companyEmail.trim()
                    ? companyEmail
                    : "No email set"
                }
              >
                {companyEmail && companyEmail.trim()
                  ? companyEmail.length > 45
                    ? `${companyEmail.slice(0, 40)}...`
                    : companyEmail
                  : "No email set"}
              </p>
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
        {isPopupInfoOpen && (
          <EditCompanyNameEmailPopup
            isOpen={isPopupInfoOpen}
            onClose={() => setIsPopupInfoOpen(false)}
            onSave={handleSaveUpdates}
            initialName={companyName}
            initialEmail={companyEmail}
          />
        )}
        {isGalleryOpen && (
          <ImageGalleryPopup onClose={() => setIsImageGalleryOpen(false)} />
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
            {logo !== "http://localhost:8000/storage/uploads/companies" ? (
              <img src={logo} alt="Logo" />
            ) : (
              <img src={srcLogo} alt={"No image"} />
            )}
          </div>

          <div className={styles.detailsHolder}>
            <p className={styles.companyName}>
              {company?.name || "No company name set"}
            </p>
            <p>{company?.email || "No contact email set"}</p>
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
