import { IconEdit } from "@tabler/icons-react";
import styles from "./CompanyManageInformationCompany.module.scss";
import { useEffect, useRef, useState } from "react";
import LocationManagement from "../../components/ui/company/LocationManagement";
import { useParams } from "react-router-dom";
import { useCompanies } from "../../contexts/CompaniesContext";
import ErrorPage from "../ErrorPage";
import Spinner from "../../components/ui/Spinner";
import { useUser } from "../../contexts/UserContext";
import { updateCompanyInfo } from "../../api/companyCRUD";
import { toast } from "react-toastify";

export default function CompanyManageInformationCompany() {
  const { slug } = useParams<{ slug: string }>();
  const { getCompanyBySlug, loading, error, updateCompany } = useCompanies();
  const company = getCompanyBySlug(slug as string);
  const { user } = useUser();

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

  useEffect(() => {
    if (company) {
      setDescription(company.description || "");
      setOriginalDescription(company.description || "");
      setCompanySize(company.size || "");
      setOriginalSize(company.size || "");
      setIndustry(company.industry || "");
      setOriginalIndustry(company.industry || "");
    }
  }, [company]);

  if (loading)
    return <Spinner message="Please wait while we render relevant data!" />;
  if (error) return <ErrorPage />;
  if (!company) return <div></div>;
  if (!user || user.role !== "Rep" || company?.posted_by !== user.id) {
    return <ErrorPage />;
  }

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

  return (
    <div className={styles.container}>
      <h2>Company Information</h2>
      {isUpdating && <Spinner message="Updating..." />}{" "}
      {/* COMPANY DESCRIPTION */}
      <div>
        <div className={styles.sectionHeading}>
          <h3>Company Description</h3>

          {isEditDesc ? (
            <div className={styles.saveAndCancelButtons}>
              <button
                className={styles.cancelButton}
                onClick={() => {
                  setIsEditDesc(false);
                  setDescription(originalDescription);
                }}
              >
                Cancel
              </button>
              <button className={styles.saveButton} onClick={handleSaveUpdates}>
                Save
              </button>
            </div>
          ) : (
            <button
              className={styles.headingEditButton}
              onClick={() => {
                setIsEditDesc(true);
                setOriginalDescription(description);
              }}
            >
              <IconEdit className={styles.iconEdit} />
            </button>
          )}
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

          {isEditCompanySize ? (
            <div className={styles.saveAndCancelButtons}>
              <button
                className={styles.cancelButton}
                onClick={() => {
                  setIsEditCompanySize(false);
                  setCompanySize(originalSize);
                }}
              >
                Cancel
              </button>
              <button className={styles.saveButton} onClick={handleSaveUpdates}>
                Save
              </button>
            </div>
          ) : (
            <button
              className={styles.headingEditButton}
              onClick={() => {
                setIsEditCompanySize(true);
                setOriginalSize(size);
              }}
            >
              <IconEdit className={styles.iconEdit} />
            </button>
          )}
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

          {isEditIndustry ? (
            <div className={styles.saveAndCancelButtons}>
              <button
                className={styles.cancelButton}
                onClick={() => {
                  setIsEditIndustry(false);
                  setIndustry(originalIndustry);
                }}
              >
                Cancel
              </button>
              <button className={styles.saveButton} onClick={handleSaveUpdates}>
                Save
              </button>
            </div>
          ) : (
            <button
              className={styles.headingEditButton}
              onClick={() => {
                setIsEditIndustry(true);
                setOriginalIndustry(industry);
              }}
            >
              <IconEdit className={styles.iconEdit} />
            </button>
          )}
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
    </div>
  );
}
