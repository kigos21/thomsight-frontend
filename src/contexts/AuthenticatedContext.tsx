import React, { createContext, useContext, useEffect, useState } from "react";
import Spinner from "../components/ui/Spinner";
import axiosInstance from "../services/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

interface AuthContextType {
  isLoggedIn: boolean | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get("/api/auth/check");
        setIsLoggedIn(response.data.loggedIn);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const isPublicRoute =
      location.pathname.includes("terms-and-conditions") ||
      location.pathname.includes("data-privacy");

    if (isLoggedIn && !isPublicRoute) {
      navigate("/companies");
    }
  }, [isLoggedIn, navigate]);

  if (loading) {
    return <Spinner message="Loading..." />;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
