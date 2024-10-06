import StyledBox from "../../layout/StyledBox";
import Button from "../Button";
import FormField from "../../form/FormField";
import { useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./CompanyJobInformationFormItem.module.scss";
import { Job } from "../../../types/types";
import { useCompanies } from "../../../contexts/CompaniesContext";
import Spinner from "../Spinner";
import { addJob } from "../../../api/companyCRUD";
import SuccessMessage from "../../form/SuccessMessage";

interface CompanyJobInformationFormItemProps {
  job: Job;
  onSave: () => void;
  onChange: (job: Job) => void;
  onCancel: () => void;
}

export default function CompanyJobInformationFormItem({
  job,
  onSave,
  onChange,
  onCancel,
}: CompanyJobInformationFormItemProps) {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange({ ...job, [name]: value }); // Update job state based on input change
  };
  const { slug } = useParams<{ slug: string }>();
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<boolean>(false);
  const { getCompanyBySlug, updateCompany, createJob } = useCompanies();
  const company = getCompanyBySlug(slug || "");
  const [creating, setCreating] = useState(false);

  const handleJobTitleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setJobTitle(e.target.value);
  };

  const handleJobDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setJobDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setSuccess(false);
    try {
      const newJob = await addJob(slug || "", {
        title: jobTitle,
        description: jobDescription,
      });

      const updatedCompany = {
        ...company!,
        jobs: [...(company?.jobs || []), newJob],
      };
      updateCompany(updatedCompany);
      createJob(newJob);

      setSuccess(true);
      setJobTitle("");
      setJobDescription("");
    } catch (err) {
      setError("An error occurred while posting the job." + err);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className={`${styles.container}`}>
      {creating && <Spinner message="Creating job..." />}
      {success && <SuccessMessage message="Created job successfully" />}
      <StyledBox paddedContainerClass={styles.styledBox}>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div>
            <p className={styles.formTitle}>Job Title</p>
            <FormField
              classNames={styles.formField}
              type="text"
              name="title"
              placeholder="Enter Job Title"
              required={true}
              value={job.title}
              onChange={handleInputChange}
            ></FormField>
          </div>

          {/* <div>
            <p className={styles.formTitle}>Tags</p>
            <FormField
              classNames={styles.formField}
              type="text"
              placeholder="Enter Tags"
              required={true}
            ></FormField>
          </div> */}

          <div>
            <p className={styles.formTitle}>Job Description</p>
            <FormField
              classNames={styles.formFieldBio}
              type="textarea"
              name="description"
              placeholder="Enter Job Description"
              required={true}
              value={job.description}
              onChange={handleInputChange}
            ></FormField>
          </div>

          <div className={styles.buttonGroup}>
            <Button
              color="secondary"
              roundness="rounded"
              classNames={styles.button}
              onClick={onCancel}
              style={{ backgroundColor: "var(--neutral-2)" }}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              roundness="rounded"
              classNames={styles.button}
              onClick={onSave}
            >
              Submit
            </Button>
          </div>
        </form>
      </StyledBox>
    </div>
  );
}
