// AppContext.js
import { useSession } from "next-auth/react";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  DashboardOutlined,
  HomeOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

interface ContextOptions {
  userData: any;
  selectedCompany: any;
  allCompanies: any;
  campanyName: any;
  selectedCompanyDetails: any;
  userSession: any;
  loading: boolean;
  isAuth: boolean;
  sideMenus: any;
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
    selectedCompanyDetails: null,
    userSession: {},
    loading: true,
    isAuth: false,
    sideMenus: [
      {
        key: "/user",
        icon: <DashboardOutlined />,
        label: "Dashboard",
      },
    ],
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
