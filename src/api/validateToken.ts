import axiosInstance from "../services/axiosInstance";

export const validateToken = async (token: string): Promise<boolean> => {
  try {
    const response = await axiosInstance.post("/api/validate-token", { token });
    return response.data.valid;
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
};
