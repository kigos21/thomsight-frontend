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
  return await axiosInstance.post("/api/login", { email, password });
};

export const logout = async () => {
  await axiosInstance.get("/sanctum/csrf-cookie");
  return await axiosInstance.get("/api/logout");
};

// const handleLogout = async (e: React.FormEvent) => {
//   e.preventDefault();
//   try {
//     await logout();
//     console.log("Logout successful");
//   } catch (err) {
//     console.error("Logout failed", err);
//   }
// };
