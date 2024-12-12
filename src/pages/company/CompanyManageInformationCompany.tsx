import { IconEdit } from "@tabler/icons-react";
import styles from "./CompanyManageInformationCompany.module.scss";
import { useEffect, useRef, useState } from "react";
import LocationManagement from "../../components/ui/company/LocationManagement";
import { useParams } from "react-router-dom";
import { useCompanies } from "../../contexts/CompaniesContext";
import ErrorPage from "../ErrorPage";
import Spinner from "../../components/ui/Spinner";
import { updateCompanyInfo } from "../../api/companyCRUD";
import { toast } from "react-toastify";
import EditCompanyInfoPopup from "../../components/ui/company/EditCompanyInfoPopup";

export default function CompanyManageInformationCompany() {
  const { slug } = useParams<{ slug: string }>();
  const { getCompanyBySlug, loading, error, updateCompany } = useCompanies();

  // DATA FOR DESCRIPTION
  const [description, setDescription] = useState<string>("");
  const [originalDescription, setOriginalDescription] = useState<string>("");
  const [isEditDesc, setIsEditDesc] = useState<boolean>(false);

  const descRef = useRef<HTMLTextAreaElement>(null);

  // DATA FOR COMPANY SIZE
  const [size, setCompanySize] = useState<string>("");
  const [originalSize, setOriginalSize] = useState<string>("");
  const [isEditCompanySize, setIsEditCompanySize] = useState<boolean>(false);

  // DATA FOR COMPANY INDUSTRY
  const [industry, setIndustry] = useState<string>("");
  const [originalIndustry, setOriginalIndustry] = useState<string>("");
  const [isEditIndustry, setIsEditIndustry] = useState<boolean>(false);

  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const [isEditPopupOpen, setIsEditPopupOpen] = useState<boolean>(false);

  useEffect(() => {
    if (slug) {
      const fetchedCompany = getCompanyBySlug(slug);
      if (fetchedCompany) {
        setDescription(fetchedCompany.description || "");
        setOriginalDescription(fetchedCompany.description || "");
        setCompanySize(fetchedCompany.size || "");
        setOriginalSize(fetchedCompany.size || "");
        setIndustry(fetchedCompany.industry || "");
        setOriginalIndustry(fetchedCompany.industry || "");
      }
    }
  }, [slug, getCompanyBySlug]);

  if (loading)
    return <Spinner message="Please wait while we render relevant data!" />;
  if (error) return <ErrorPage />;
  const company = getCompanyBySlug(slug as string);

  const handleSaveUpdates = async () => {
    if (isEditDesc && description.trim() === "") {
      toast.error("Description cannot be blank");
      return;
    }
    if (isEditCompanySize && size.trim() === "") {
      toast.error("Company size cannot be blank");
      return;
    }
    if (isEditIndustry && industry.trim() === "") {
      toast.error("Industry cannot be blank");
      return;
    }
    if (isEditDesc && description.length > 2500) {
      toast.error("Description should not exceed more than 2500 characters");
      return;
    }
    if (isEditCompanySize && size.length > 100) {
      toast.error("Size should not exceed more than 100 characters");
      return;
    }
    if (isEditIndustry && industry.length > 100) {
      toast.error("Industry should not exceed more than 100 characters");
      return;
    }

    setIsUpdating(true);
    try {
      if (!slug) {
        throw new Error("Slug is undefined");
      }

      const updatedData = {
        description,
        industry,
        size,
      };

      await updateCompanyInfo(slug, updatedData);

      const updatedCompany = {
        ...company,
        description,
        industry,
        size,
      };
      updateCompany(updatedCompany);
      toast.success("Updated successfully");
    } catch (error) {
      console.error("Error updating company data:", error);
    } finally {
      setIsUpdating(false);
      setIsEditDesc(false);
      setIsEditCompanySize(false);
      setIsEditIndustry(false);
    }
  };

  const handleEditInfo = () => {
    setIsEditPopupOpen(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h2>Company Information</h2>
        <button
          className={styles.editButton}
          onClick={handleEditInfo}
        >
          <IconEdit className={styles.iconEdit} />
          Edit Information
        </button>
      </div>
      {isUpdating && <Spinner message="Updating..." />}
      {/* COMPANY DESCRIPTION */}
      <div>
        <div className={styles.sectionHeading}>
          <h3>Company Description</h3>
        </div>
        {isEditDesc ? (
          <div>
            <textarea
              name="description"
              id="description"
              rows={10}
              className={styles.textareaDesc}
              ref={descRef}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        ) : (
          <p>{description}</p>
        )}
      </div>
      {/* END OF COMPANY DESCRIPTION */}
      {/* COMPANY SIZE */}
      <div>
        <div className={styles.sectionHeading}>
          <h3>Company Size</h3>
        </div>
        {isEditCompanySize ? (
          <div>
            <input
              type="text"
              value={size}
              onChange={(e) => setCompanySize(e.target.value)}
              className={styles.inputText}
            />
          </div>
        ) : (
          <p>{size}</p>
        )}
      </div>
      {/* END OF COMPANY SIZE */}
      {/* COMPANY INDUSTRY */}
      <div>
        <div className={styles.sectionHeading}>
          <h3>Industry</h3>
        </div>
        {isEditIndustry ? (
          <div>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className={styles.inputText}
            />
          </div>
        ) : (
          <p>{industry}</p>
        )}
      </div>
      {/* END OF COMPANY INDUSTRY */}
      {/* LOCATIONS */}
      <LocationManagement />
      {/* END OF LOCATIONS */}

      {/* Edit Company Info Popup */}
      <EditCompanyInfoPopup
        isOpen={isEditPopupOpen}
        onClose={() => setIsEditPopupOpen(false)}
        initialSize={size}
        initialIndustry={industry}
        initialDescription={description}
        onSave={async (data) => {
          setIsUpdating(true);
          try {
            if (!slug) {
              throw new Error("Slug is undefined");
            }

            await updateCompanyInfo(slug, data);
            
            const updatedCompany = {
              ...company,
              ...data
            };
            updateCompany(updatedCompany);
            setCompanySize(data.size);
            setIndustry(data.industry);
            setDescription(data.description);
            setIsEditPopupOpen(false);
            toast.success("Company information updated successfully");
          } catch (error) {
            console.error("Error updating company information:", error);
            toast.error("Failed to update company information");
          } finally {
            setIsUpdating(false);
          }
        }}
      />
    </div>
  );
}
