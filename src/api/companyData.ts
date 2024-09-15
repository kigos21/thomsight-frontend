import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Company } from "../types/props";

const BASE_URL = "http://127.0.0.1:8000/api";

export const getCompanyData = async (slug: string): Promise<Company> => {
  const response = await axios.get<Company>(`${BASE_URL}/company/${slug}`);
  return response.data;
};

export const useCompanyData = () => {
  const { slug } = useParams<{ slug: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (slug) {
        try {
          const data = await getCompanyData(slug);
          setCompany(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching company data:", error);
          setError("Failed to fetch company data.");
          setLoading(false);
        }
      }
    };

    fetchCompanyData();
  }, [slug]);

  return { company, loading, error };
};
