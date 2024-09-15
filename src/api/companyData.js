import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

export const getCompanyData = async (slug) => {
  try {
    const response = await axios.get(`${BASE_URL}/company/${slug}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
