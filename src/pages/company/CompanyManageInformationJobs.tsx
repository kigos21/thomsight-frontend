import CompanyJobInformationFormItem from "../../components/ui/company/CompanyJobInformationFormItem";
import Button from "../../components/ui/Button";

import styles from "./CompanyManageInformationJobs.module.scss";
import CompanyJobs from "../../components/ui/company/CompanyJobs";
import { useEffect, useState } from "react";
import { Job } from "../../types/types";
import { useParams } from "react-router-dom";
import { useCompanies } from "../../contexts/CompaniesContext";
import DeletePopUp from "../../components/ui/company/DeletePopUp";
import { deleteJob } from "../../api/companyCRUD";
import Spinner from "../../components/ui/Spinner";
import { toast } from "react-toastify";
import ErrorPage from "../ErrorPage";

export default function CompanyManageInformationJobs() {
  const { slug } = useParams<{ slug: string }>();
  const { getCompanyBySlug, updateCompany, loading, error } = useCompanies();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);
  const [jobToDelete, setJobToDelete] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const { loadJobs } = useCompanies();

  const company = getCompanyBySlug(slug || "");

  const [currentJob, setCurrentJob] = useState<Job>({
    id: 0, // IGNORE THIS WHEN CREATING NEW JOB, only useful when editing exising Job
    company_id: company?.id, // current company_id of logged in representative
    title: "",
    description: "",
  });

  // State to control the visibility of the form
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  useEffect(() => {
    if (slug) {
      const fetchedCompany = getCompanyBySlug(slug);
      if (fetchedCompany) {
        setJobs(fetchedCompany.jobs || []);
      }
    }
  }, [slug, getCompanyBySlug]);

  if (loading)
    return <Spinner message="Please wait while we render relevant data!" />;
  if (error) return <ErrorPage />;

  const handleAdd = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
    // Reset to a clean state for adding a new job and show the form
    setCurrentJob({ id: 0, company_id: 1, title: "", description: "" });
    setIsFormVisible(true); // Show the form
  };

  const handleEdit = (job: Job) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
    // Populate the form with the job data to be edited and show the form
    setCurrentJob(job);
    setIsFormVisible(true); // Show the form
  };

  const handleSave = () => {
    if (currentJob.id === 0) {
      // Adding a new job
      setJobs([...jobs, { ...currentJob, id: jobs.length + 1 }]);
      toast.success("Created job successfully");
    } else {
      // Updating an existing job
      setJobs(jobs.map((job) => (job.id === currentJob.id ? currentJob : job)));
      toast.success("Updated job successfully");
    }

    // Hide the form after saving
    setIsFormVisible(false);
    setCurrentJob({ id: 0, company_id: 1, title: "", description: "" });
  };

  const handleDelete = async () => {
    if (jobToDelete !== null) {
      setDeleteLoading(true);
      try {
        if (slug && jobToDelete) {
          await deleteJob(slug, jobToDelete);
          const updatedJobs = jobs.filter((job) => job.id !== jobToDelete);
          setJobs(updatedJobs);
          loadJobs();
          toast.success("Deleted job successfully");

          if (company) {
            updateCompany({ ...company, jobs: updatedJobs });
          }
        }
      } catch (error) {
        console.error("Failed to delete job", error);
        toast.error("Failed to delete job.");
      } finally {
        setDeleteLoading(false);
        setDeleteConfirm(false);
        setJobToDelete(null);
      }
    }
  };

  const handleDeleteClick = (id: number) => {
    setJobToDelete(id);
    setDeleteConfirm(true);
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
      {deleteLoading && <Spinner message="Deleting..." />}
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

      <CompanyJobs
        jobs={jobs}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      {deleteConfirm && (
        <DeletePopUp
          isVisible={deleteConfirm}
          onClose={() => setDeleteConfirm(false)}
          onDelete={handleDelete}
          heading="Delete Job"
          details="Are you sure you want to delete this job?"
        />
      )}
    </div>
  );
}
