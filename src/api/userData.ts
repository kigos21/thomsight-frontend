import axios from "axios";
import { User } from "../types/props";
import { useState, useEffect } from "react";

const BASE_URL = "http://localhost:8000/api";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export const fetchUserData = async () => {
  try {
    await axios.get("http://localhost:8000/sanctum/csrf-cookie");

    const response = await axios.get(`${BASE_URL}/profile`);
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
