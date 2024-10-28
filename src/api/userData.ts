import axiosInstance from "../services/axiosInstance";
import { User } from "../types/types";
import { useState, useEffect } from "react";

export const fetchUserData = async (): Promise<User | null> => {
  try {
    const response = await axiosInstance.get("/api/profile");
    // console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export const useUserData = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData();
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  return { user, loading };
};
