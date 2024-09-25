import { IconEdit } from "@tabler/icons-react";
import styles from "./CompanyManageInformationCompany.module.scss";
import { useRef, useState } from "react";
import LocationManagement from "../../components/ui/company/LocationManagement";

export default function CompanyManageInformationCompany() {
  // DATA FOR DESCRIPTION
  const [description, setDescription] = useState<string>(
    [
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore,",
      "ratione totam nostrum quas cum ipsam molestias libero molestiae",
      "animi, officiis quo, iure iusto facilis dolores esse perferendis",
      "ipsa quod eum similique id voluptatem fuga consectetur sunt sint?",
      "consectetur quo velit dicta laboriosam eos, repudiandae tempora.",
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore,",
      "ratione totam nostrum quas cum ipsam molestias libero molestiae",
      "animi, officiis quo, iure iusto facilis dolores esse perferendis",
      "ipsa quod eum similique id voluptatem fuga consectetur sunt sint?",
      "consectetur quo velit dicta laboriosam eos, repudiandae tempora.",
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore,",
      "ratione totam nostrum quas cum ipsam molestias libero molestiae",
      "animi, officiis quo, iure iusto facilis dolores esse perferendis",
      "ipsa quod eum similique id voluptatem fuga consectetur sunt sint?",
      "consectetur quo velit dicta laboriosam eos, repudiandae tempora.",
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore,",
      "ratione totam nostrum quas cum ipsam molestias libero molestiae",
      "animi, officiis quo, iure iusto facilis dolores esse perferendis",
      "ipsa quod eum similique id voluptatem fuga consectetur sunt sint?",
      "consectetur quo velit dicta laboriosam eos, repudiandae tempora.",
    ].join(" ")
  );
  const [isEditDesc, setIsEditDesc] = useState<boolean>(false);
  const descRef = useRef<HTMLTextAreaElement>(null);

  // DATA FOR COMPANY SIZE
  const [companySize, setCompanySize] = useState<string>("10 000+");
  const [tempCompanySize, setTempCompanySize] = useState<string>("");
  const [isEditCompanySize, setIsEditCompanySize] = useState<boolean>(false);

  // DATA FOR COMPANY INDUSTRY
  const [industry, setIndustry] = useState<string>("Bank Technologies");
  const [tempIndustry, setTempIndustry] = useState<string>("");
  const [isEditIndustry, setIsEditIndustry] = useState<boolean>(false);

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
