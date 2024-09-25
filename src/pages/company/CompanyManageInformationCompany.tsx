import { IconEdit } from "@tabler/icons-react";
import styles from "./CompanyManageInformationCompany.module.scss";
import { useEffect, useRef, useState } from "react";
import LocationManagement from "../../components/ui/company/LocationManagement";
import { useParams } from "react-router-dom";
import { useCompanies } from "../../contexts/CompaniesContext";
import ErrorPage from "../ErrorPage";
import Spinner from "../../components/ui/Spinner";

export default function CompanyManageInformationCompany() {
  const { slug } = useParams<{ slug: string }>();
  const { getCompanyBySlug, loading, error } = useCompanies();
  const company = getCompanyBySlug(slug as string);

  // DATA FOR DESCRIPTION
  const [description, setDescription] = useState<string>("");
  const [isEditDesc, setIsEditDesc] = useState<boolean>(false);
  const descRef = useRef<HTMLTextAreaElement>(null);

  // DATA FOR COMPANY SIZE
  const [companySize, setCompanySize] = useState<string>("");
  const [tempCompanySize, setTempCompanySize] = useState<string>("");
  const [isEditCompanySize, setIsEditCompanySize] = useState<boolean>(false);

  // DATA FOR COMPANY INDUSTRY
  const [industry, setIndustry] = useState<string>("");
  const [tempIndustry, setTempIndustry] = useState<string>("");
  const [isEditIndustry, setIsEditIndustry] = useState<boolean>(false);

  useEffect(() => {
    if (company) {
      setDescription(company.description || "");
      setCompanySize(company.size || "");
      setIndustry(company.industry || "");
    }
  }, [company]);

  if (loading)
    return <Spinner message="Please wait while we render relevant data!" />;
  if (error) return <ErrorPage />;
  if (!company) return <div></div>;

  return (
    <div className={styles.container}>
      <h2>Company Information</h2>

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
                }}
              >
                Cancel
              </button>
              <button
                className={styles.saveButton}
                onClick={() => {
                  setDescription(descRef.current!.value);
                  setIsEditDesc(false);
                }}
              >
                Save
              </button>
            </div>
          ) : (
            <button
              className={styles.headingEditButton}
              onClick={() => setIsEditDesc(true)}
            >
              <IconEdit />
            </button>
          )}
        </div>

        {isEditDesc ? (
          <textarea
            name="description"
            id="description"
            rows={10}
            className={styles.textareaDesc}
            ref={descRef}
          >
            {description}
          </textarea>
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
                  setTempCompanySize(companySize);
                  setIsEditCompanySize(false);
                }}
              >
                Cancel
              </button>
              <button
                className={styles.saveButton}
                onClick={() => {
                  setCompanySize(tempCompanySize);
                  setIsEditCompanySize(false);
                }}
              >
                Save
              </button>
            </div>
          ) : (
            <button
              className={styles.headingEditButton}
              onClick={() => {
                setTempCompanySize(companySize);
                setIsEditCompanySize(true);
              }}
            >
              <IconEdit />
            </button>
          )}
        </div>

        {isEditCompanySize ? (
          <input
            type="text"
            value={tempCompanySize}
            onChange={(e) => setTempCompanySize(e.target.value)}
            className={styles.inputText}
          />
        ) : (
          <p>{companySize}</p>
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
                  setTempIndustry(industry);
                  setIsEditIndustry(false);
                }}
              >
                Cancel
              </button>
              <button
                className={styles.saveButton}
                onClick={() => {
                  setIndustry(tempIndustry);
                  setIsEditIndustry(false);
                }}
              >
                Save
              </button>
            </div>
          ) : (
            <button
              className={styles.headingEditButton}
              onClick={() => {
                setTempIndustry(industry);
                setIsEditIndustry(true);
              }}
            >
              <IconEdit />
            </button>
          )}
        </div>

        {isEditIndustry ? (
          <input
            type="text"
            value={tempIndustry}
            onChange={(e) => setTempIndustry(e.target.value)}
            className={styles.inputText}
          />
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
