import StyledBox from "../../layout/StyledBox";
import Button from "../Button";
import FormField from "../../form/FormField";
import { useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./CompanyJobInformationFormItem.module.scss";
import { useCompanies } from "../../../contexts/CompaniesContext";
import Spinner from "../Spinner";
import { addJob } from "../../../api/companyCRUD";

interface CompanyJobInformationFormItemProps {
  jobTitle: string;
  jobDescription: string;
}

export default function CompanyJobInformationFormItem({
  classNames,
  style,
}: CompanyJobInformationFormItemProps) {
  const { slug } = useParams<{ slug: string }>();
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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

      setSuccess("Job posted successfully!");
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
      <StyledBox paddedContainerClass={styles.styledBox}>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div>
            <p className={styles.formTitle}>Job Title</p>
            <FormField
              classNames={styles.formField}
              type="text"
              placeholder="Enter Job Title"
              onChange={handleJobTitleChange}
              value={jobTitle}
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
              placeholder="Enter Job Description"
              onChange={handleJobDescriptionChange}
              value={jobDescription}
            ></FormField>
          </div>

          <Button
            color="primary"
            roundness="rounded"
            classNames={styles.button}
          >
            Submit
          </Button>
        </form>
      </StyledBox>
    </div>
  );
}
