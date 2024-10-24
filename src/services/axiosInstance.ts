import axios from "axios";

// const BASE_URL = "http://localhost:8000";
const BASE_URL = "https://api.thomsight.com";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  withXSRFToken: true,
});

export default axiosInstance;
