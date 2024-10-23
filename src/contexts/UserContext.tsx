import React, { createContext, useContext } from "react";
import { useUserData } from "../api/userData";
import { User } from "../types/types";
import Spinner from "../components/ui/Spinner";

interface UserContextType {
  user: User | null;
  loading: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useUserData();

  if (loading) {
    return <Spinner message="Loading..." />; // You can customize this as needed
  }

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
