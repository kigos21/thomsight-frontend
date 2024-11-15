import StyledBox from "../../layout/StyledBox";
import Button from "../Button";
import FormField from "../../form/FormField";
import { useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./CompanyJobInformationFormItem.module.scss";
import { Job } from "../../../types/types";
import { useCompanies } from "../../../contexts/CompaniesContext";
import Spinner from "../Spinner";
import { addJob, updateJob } from "../../../api/companyCRUD";
import { toast } from "react-toastify";
import ErrorPage from "../../../pages/ErrorPage";

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
  const { getCompanyBySlug, updateCompany, createJob, loading, error } =
    useCompanies();
  const [creating, setCreating] = useState(false);
  const { loadJobs } = useCompanies();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (job.title.length > 100) {
      toast.error("Title should not exceed 100 characters");
      return;
    }
    if (job.description.length > 1500) {
      toast.error("Description should not exceed 1500 characters");
      return;
    }
    try {
      setCreating(true);
      if (job.id === 0) {
        const newJob = await addJob(slug || "", {
          title: job.title,
          description: job.description,
        });

        const updatedCompany = {
          ...company!,
          jobs: [...(company?.jobs || []), newJob],
        };
        updateCompany(updatedCompany);
        createJob(newJob);
      } else {
        const updatedJob = await updateJob(slug || "", job.id, {
          title: job.title,
          description: job.description,
        });

        const updatedCompany = {
          ...company!,
          jobs:
            company?.jobs?.map((j) => (j.id === job.id ? updatedJob : j)) || [],
        };
        updateCompany(updatedCompany);
        loadJobs();
      }
      onSave();
    } catch (err) {
      toast.error("An error occurred while saving the job.");
      console.log(err);
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return <Spinner message="Please wait while we render relevant data!" />;
  }

  if (!slug || slug.trim() === "" || error) {
    return <ErrorPage />;
  }

  const company = getCompanyBySlug(slug as string);

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
              color="gray"
              roundness="rounded"
              classNames={styles.button}
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              roundness="rounded"
              classNames={styles.button}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </StyledBox>
    </div>
  );
}
