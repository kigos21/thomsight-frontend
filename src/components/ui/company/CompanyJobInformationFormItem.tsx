import { CompanyJobInformationFormItemProps } from "../../../types/props";
import StyledBox from "../../layout/StyledBox";
import Button from "../Button";
import FormField from "../../form/FormField";
import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { useParams } from "react-router-dom";

import styles from "./CompanyJobInformationFormItem.module.scss";
import { useCompanies } from "../../../contexts/CompaniesContext";

export default function CompanyJobInformationFormItem({
  classNames,
  style,
}: CompanyJobInformationFormItemProps) {
  const { slug } = useParams<{ slug: string }>();
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { getCompanyBySlug, updateCompany } = useCompanies();
  const company = getCompanyBySlug(slug || "");

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
    try {
      const response = await axiosInstance.post(
        `/api/company/${slug}/jobs/create`,
        {
          title: jobTitle,
          description: jobDescription,
        }
      );
      if (response.status === 201) {
        const newJob = response.data;
        const updatedCompany = {
          ...company!,
          jobs: [...(company?.jobs || []), newJob],
        };
        updateCompany(updatedCompany);

        setSuccess("Job posted successfully!");
        setJobTitle("");
        setJobDescription("");
      }
    } catch (err) {
      setError("An error occurred while posting the job.");
    }
  };

  return (
    <div className={`${styles.container} ${classNames}`} style={style}>
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
              required={true}
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
