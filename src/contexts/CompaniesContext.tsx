// src/contexts/CompaniesContext.tsx

import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchCompanies } from "../api/companyData";
import { Company } from "../types/types";

interface CompaniesContextType {
  companies: Company[] | null;
  loading: boolean;
  error: string | null;
}

const CompaniesContext = createContext<CompaniesContextType | undefined>(
  undefined
);

export const CompaniesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [companies, setCompanies] = useState<Company[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const data = await fetchCompanies();
        setCompanies(data);
      } catch (err) {
        console.log(err);
        setError("Failed to load companies.");
      } finally {
        setLoading(false);
      }
    };

    loadCompanies();
  }, []);

  return (
    <CompaniesContext.Provider value={{ companies, loading, error }}>
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
