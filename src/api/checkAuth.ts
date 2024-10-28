import axios from "axios";

export const checkAuth = async (): Promise<boolean> => {
  try {
    const response = await axios.get("/api/auth/check");
    return response.data.loggedIn;
  } catch (error) {
    console.error("Authentication check failed", error);
    return false;
  }
};
