import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchCompanies, fetchJobs } from "../api/companyData";
import { Company, Job } from "../types/types";
import axiosInstance from "../services/axiosInstance";
import Spinner from "../components/ui/Spinner";

interface CompaniesContextType {
  companies: Company[] | null;
  jobs: Job[] | null;
  loading: boolean;
  error: string | null;
  getCompanyBySlug: (slug: string) => Company | undefined;
  updateCompany: (updatedCompany: Company) => void;
  createJob: (newJob: Job) => void;
}

const CompaniesContext = createContext<CompaniesContextType | undefined>(
  undefined
);

export const CompaniesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [companies, setCompanies] = useState<Company[] | null>(null);
  const [jobs, setJobs] = useState<Job[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        await axiosInstance.get("/sanctum/csrf-cookie");
        const companiesData = await fetchCompanies();
        setCompanies(companiesData);
      } catch (err) {
        console.log(err);
        setError("Failed to load companies.");
      } finally {
        setLoading(false);
      }
    };

    const loadJobs = async () => {
      try {
        await axiosInstance.get("/sanctum/csrf-cookie");
        const jobsData = await fetchJobs();
        setJobs(jobsData);
      } catch (err) {
        console.log(err);
        setError("Failed to load jobs.");
      } finally {
        setLoading(false);
      }
    };

    loadCompanies();
    loadJobs();
  }, []);

  const getCompanyBySlug = (slug: string) => {
    return companies!.find((company) => company.slug === slug);
  };

  const updateCompany = (updatedCompany: Company) => {
    setCompanies((prevCompanies) => {
      if (!prevCompanies) return null;

      return prevCompanies.map((company) =>
        company.slug === updatedCompany.slug ? updatedCompany : company
      );
    });
  };

  const createJob = (newJob: Job) => {
    setJobs((prevJobs) => {
      if (!prevJobs) return [newJob];
      return [...prevJobs, newJob];
    });
  };

  if (loading) {
    return <Spinner message="Loading..." />; // You can customize this as needed
  }

  return (
    <CompaniesContext.Provider
      value={{
        companies,
        jobs,
        loading,
        error,
        getCompanyBySlug,
        updateCompany,
        createJob,
      }}
    >
      {children}
    </CompaniesContext.Provider>
  );
};

export const useCompanies = () => {
  const context = useContext(CompaniesContext);
  if (context === undefined) {
    throw new Error("useCompanies must be used within a CompaniesProvider");
  }
  return context;
};
