"use client";

import { createContext, ReactNode, useContext } from "react";
import { useActiveAccount } from "thirdweb/react";

type AppContextType = {
  activeAccount: ReturnType<typeof useActiveAccount> | null;
};

export const AppContext = createContext<AppContextType | null>(null);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const activeAccount = useActiveAccount();

  return (
    <AppContext.Provider value={{ activeAccount }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within a ContextProvider");
  return context;
};
