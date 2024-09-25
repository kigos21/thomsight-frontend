import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Company } from "../types/types";
import axiosInstance from "../services/axiosInstance";

export const fetchCompanyData = async (
  slug: string
): Promise<Company | null> => {
  try {
    const response = await axiosInstance.get<Company>(`/api/company/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching company data:", error);
    return null;
  }
};

export const useCompanyData = () => {
  const { slug } = useParams<{ slug: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCompanyData = async () => {
      setLoading(true);
      if (slug) {
        try {
          const data = await fetchCompanyData(slug);
          console.log(data);
          setCompany(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching company data:", error);
          setError("Failed to fetch company data.");
          setLoading(false);
        }
      }
    };

    getCompanyData();
  }, [slug]);

  return { company, loading, error };
};

export const fetchCompanies = async (): Promise<Company[] | null> => {
  try {
    const response = await axiosInstance.get<Company[]>("/api/companies");
    return response.data;
  } catch (error) {
    console.error("Error fetching company list:", error);
    return null;
  }
};
