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
import ValidationError from "../../components/form/ValidationError";
import SuccessMessage from "../../components/form/SuccessMessage";

export default function CompanyManageInformationCompany() {
  const { slug } = useParams<{ slug: string }>();
  const { getCompanyBySlug, loading, error, updateCompany } = useCompanies();
  const company = getCompanyBySlug(slug as string);
  const { user } = useUser();

  // DATA FOR DESCRIPTION
  const [description, setDescription] = useState<string>("");
  const [originalDescription, setOriginalDescription] = useState<string>("");
  const [isEditDesc, setIsEditDesc] = useState<boolean>(false);
  const [descriptionError, setDescriptionError] = useState<string>("");

  const descRef = useRef<HTMLTextAreaElement>(null);

  // DATA FOR COMPANY SIZE
  const [size, setCompanySize] = useState<string>("");
  const [originalSize, setOriginalSize] = useState<string>("");
  const [isEditCompanySize, setIsEditCompanySize] = useState<boolean>(false);
  const [sizeError, setSizeError] = useState<string>("");

  // DATA FOR COMPANY INDUSTRY
  const [industry, setIndustry] = useState<string>("");
  const [originalIndustry, setOriginalIndustry] = useState<string>("");
  const [isEditIndustry, setIsEditIndustry] = useState<boolean>(false);
  const [industryError, setIndustryError] = useState<string>("");

  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

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
    let isValid = true;

    setDescriptionError("");
    setSizeError("");
    setIndustryError("");
    setSuccess(false);

    if (description.trim() === "") {
      setDescriptionError("Description cannot be blank");
      isValid = false;
    }
    if (size.trim() === "") {
      setSizeError("Company size cannot be blank");
      isValid = false;
    }
    if (industry.trim() === "") {
      setIndustryError("Industry cannot be blank");
      isValid = false;
    }

    if (!isValid) return;

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
      setSuccess(true);
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
      {success && <SuccessMessage message="Updated successfully" />}
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
                  setDescriptionError("");
                  setSuccess(false);
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
                setSuccess(false);
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
            {descriptionError && <ValidationError message={descriptionError} />}
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
                  setSizeError("");
                  setSuccess(false);
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
                setSuccess(false);
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
            {sizeError && <ValidationError message={sizeError} />}
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
                  setIndustryError("");
                  setSuccess(false);
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
                setSuccess(false);
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
            {industryError && <ValidationError message={industryError} />}
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
