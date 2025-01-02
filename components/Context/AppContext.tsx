// AppContext.js
import React, { ReactNode, createContext, useContext, useState } from "react";

interface ContextOptions {
  userData: any;
  selectedCompany: any;
  allCompanies: any;
  campanyName: any;
}

interface AppContextProps {
  contextOptions: ContextOptions;
  setContextOptions: React.Dispatch<React.SetStateAction<ContextOptions>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [contextOptions, setContextOptions] = useState<ContextOptions>({
    userData: null,
    selectedCompany: {
      name: "No Company",
    },
    allCompanies: [],
    campanyName: null,
  });

  return (
    <AppContext.Provider value={{ contextOptions, setContextOptions }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
