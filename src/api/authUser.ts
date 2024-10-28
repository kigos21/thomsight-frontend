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
  try {
    const response = await axiosInstance.post("/login", {
      email,
      password,
    });
    // console.log(response);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const logout = async () => {
  return await axiosInstance.post("/logout");
};
