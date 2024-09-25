import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Company } from "../types/types";

const BASE_URL = "http://127.0.0.1:8000/api";

export const fetchCompanyData = async (
  slug: string
): Promise<Company | null> => {
  try {
    const response = await axios.get<Company>(`${BASE_URL}/company/${slug}`);
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
      if (slug) {
        try {
          const data = await fetchCompanyData(slug);
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
