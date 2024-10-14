import axiosInstance from "../services/axiosInstance.ts";

interface LoginResponse {
  success: boolean;
  token?: string;
  error?: string;
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  await axiosInstance.get("/sanctum/csrf-cookie");
  return await axiosInstance.post("/login", { email, password });
};

export const logout = async () => {
  await axiosInstance.get("/sanctum/csrf-cookie");
  return await axiosInstance.post("/logout");
};
