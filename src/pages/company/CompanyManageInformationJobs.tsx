import CompanyJobInformationFormItem from "../../components/ui/company/CompanyJobInformationFormItem";
import Button from "../../components/ui/Button";

import styles from "./CompanyManageInformationJobs.module.scss";
import CompanyJobs from "../../components/ui/company/CompanyJobs";
import { useState } from "react";
import { Job } from "../../types/types";

export default function CompanyManageInformationJobs() {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 1,
      company_id: 1,
      title: "Java Developer",
      description: "Lorem ipsum dolor sit amet consectetur...",
    },
    {
      id: 2,
      company_id: 1,
      title: "C++ Developer",
      description: "Lorem ipsum dolor sit amet consectetur...",
    },
    {
      id: 3,
      company_id: 1,
      title: "React Developer",
      description: "Short description",
    },
  ]);

  const [currentJob, setCurrentJob] = useState<Job>({
    id: 0, // IGNORE THIS WHEN CREATING NEW JOB, only useful when editing exising Job
    company_id: 1, // current company_id of logged in representative
    title: "",
    description: "",
  });

  // State to control the visibility of the form
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const handleAdd = () => {
    // Reset to a clean state for adding a new job and show the form
    setCurrentJob({ id: 0, company_id: 1, title: "", description: "" });
    setIsFormVisible(true); // Show the form
  };

  const handleEdit = (job: Job) => {
    // Populate the form with the job data to be edited and show the form
    setCurrentJob(job);
    setIsFormVisible(true); // Show the form
  };

  const handleSave = () => {
    if (currentJob.id === 0) {
      // Adding a new job
      setJobs([...jobs, { ...currentJob, id: jobs.length + 1 }]);
    } else {
      // Updating an existing job
      setJobs(jobs.map((job) => (job.id === currentJob.id ? currentJob : job)));
    }

    // Hide the form after saving
    setIsFormVisible(false);
    setCurrentJob({ id: 0, company_id: 1, title: "", description: "" });
  };

  const handleDelete = (id: number) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  const handleChange = (updatedJob: Job) => {
    setCurrentJob(updatedJob); // Update current job with new input values
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setCurrentJob({ id: 0, company_id: 1, title: "", description: "" });
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2>Job Information</h2>
        <Button
          classNames={styles.addJobButton}
          color="secondary"
          roundness="rounded"
          onClick={handleAdd}
        >
          Add Job
        </Button>
      </div>

      {/* Conditionally render the form based on isFormVisible */}
      {isFormVisible && (
        <CompanyJobInformationFormItem
          job={currentJob}
          onSave={handleSave}
          onChange={handleChange}
          onCancel={handleCancel}
        />
      )}

      <CompanyJobs jobs={jobs} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
