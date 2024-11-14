import { createContext, useContext, useState } from "react";

interface NavContextType {
  displayNav: boolean;
  setDisplayNav: (state: boolean) => void;
}

const NavContext = createContext<NavContextType | undefined>(undefined);

// Provide the context with a provider component
export function NavProvider({ children }: { children: React.ReactNode }) {
  const [displayNav, setDisplayNav] = useState(false);

  return (
    <NavContext.Provider value={{ displayNav, setDisplayNav }}>
      {children}
    </NavContext.Provider>
  );
}

// Custom hook to use the NavContext
export function useNav() {
  const context = useContext(NavContext);
  if (context === undefined) {
    throw new Error("useNav must be used within a NavProvider");
  }
  return context;
}
