import React, { createContext, useContext, useEffect, useState } from "react";
import { useUserData } from "../api/userData";
import { User } from "../types/types";
import Spinner from "../components/ui/Spinner";

interface UserContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user: initialUser, loading: initialLoading } = useUserData();
  const [user, setUser] = useState<User | null>(initialUser);
  const [loading, setLoading] = useState(initialLoading);

  useEffect(() => {
    setUser(initialUser);
    setLoading(initialLoading);
  }, [initialUser, initialLoading]);

  if (loading) {
    return <Spinner message="Loading..." />;
  }

  return (
    <UserContext.Provider value={{ user, loading, setUser }}>
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
