import { IconEdit } from "@tabler/icons-react";
import styles from "./CompanyManageInformationCompany.module.scss";
import { useEffect, useState } from "react";
import LocationManagement from "../../components/ui/company/LocationManagement";
import { useParams } from "react-router-dom";
import { useCompanies } from "../../contexts/CompaniesContext";
import ErrorPage from "../ErrorPage";
import Spinner from "../../components/ui/Spinner";
import { updateCompanyInfo } from "../../api/companyCRUD";
import { toast } from "react-toastify";
import EditCompanyInfoPopup from "../../components/ui/company/EditCompanyInfoPopup";
import DOMPurify from "dompurify";

export default function CompanyManageInformationCompany() {
  const { slug } = useParams<{ slug: string }>();
  const { getCompanyBySlug, loading, error, updateCompany } = useCompanies();

  // DATA FOR DESCRIPTION
  const [description, setDescription] = useState<string>("");

  // DATA FOR COMPANY SIZE
  const [size, setCompanySize] = useState<string>("");

  // DATA FOR COMPANY INDUSTRY
  const [industry, setIndustry] = useState<string>("");

  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const [isEditPopupOpen, setIsEditPopupOpen] = useState<boolean>(false);

  useEffect(() => {
    if (slug) {
      const fetchedCompany = getCompanyBySlug(slug);
      if (fetchedCompany) {
        setDescription(fetchedCompany.description || "");
        setCompanySize(fetchedCompany.size || "");
        setIndustry(fetchedCompany.industry || "");
      }
    }
  }, [slug, getCompanyBySlug]);

  if (loading)
    return <Spinner message="Please wait while we render relevant data!" />;
  if (error) return <ErrorPage />;
  const company = getCompanyBySlug(slug as string);

  const handleEditInfo = () => {
    setIsEditPopupOpen(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h2>Company Information</h2>
        <button className={styles.editButton} onClick={handleEditInfo}>
          <IconEdit className={styles.iconEdit} />
          Edit Information
        </button>
      </div>
      {isUpdating && <Spinner message="Updating..." />}
      {/* COMPANY SIZE */}
      <div>
        <div className={styles.sectionHeading}>
          <h3>Company Size</h3>
        </div>

        <p>{size}</p>
      </div>
      {/* END OF COMPANY SIZE */}
      {/* COMPANY INDUSTRY */}
      <div>
        <div className={styles.sectionHeading}>
          <h3>Industry</h3>
        </div>

        <p className={styles.industryContainer}>{industry}</p>
      </div>
      {/* END OF COMPANY INDUSTRY */}
      {/* COMPANY DESCRIPTION */}
      <div>
        <div className={styles.sectionHeading}>
          <h3>Company Description</h3>
        </div>

        <p
          className={styles.companyDescription}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              company?.description || "No company description"
            ),
          }}
        ></p>
      </div>
      {/* END OF COMPANY DESCRIPTION */}

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
          setIsEditPopupOpen(false);
          try {
            if (!slug) {
              throw new Error("Slug is undefined");
            }

            await updateCompanyInfo(slug, data);

            const updatedCompany = {
              ...company,
              ...data,
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
