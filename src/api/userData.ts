import axios from "axios";
import { User } from "../types/props";
import { useState, useEffect } from "react";

const BASE_URL = "http://127.0.0.1:8000/api";

export const fetchUserData = async (): Promise<User | null> => {
  try {
    const response = await axios.get<User>(`${BASE_URL}/user`, {
      withCredentials: true,
    });
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
