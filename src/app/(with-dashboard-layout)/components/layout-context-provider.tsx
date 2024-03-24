"use client";

import { createContext, useState, type ReactElement } from "react";

export type LayoutContextType = {
  isSidebarOpen: boolean;
  isIconsOnly: boolean;
  toggleIconsOnly: () => void;
  toggleSidebar: () => void;
};

export const LayoutContext = createContext<LayoutContextType>({
  isSidebarOpen: false,
  isIconsOnly: false,
  toggleIconsOnly: () => void {},
  toggleSidebar: () => void {},
});

const LayoutContextProvider = ({ children }: { children: ReactElement }) => {
  const [layoutState, setLayoutState] = useState({
    isSidebarOpen: false,
    isIconsOnly: false,
  });

  const toggleSidebar = () => {
    setLayoutState((prevState) => ({
      ...prevState,
      isSidebarOpen: !prevState.isSidebarOpen,
    }));
  };

  const toggleIconsOnly = () => {
    setLayoutState((prevState) => ({
      ...prevState,
      isIconsOnly: !prevState.isIconsOnly,
    }));
  };

  return (
    <LayoutContext.Provider
      value={{ ...layoutState, toggleSidebar, toggleIconsOnly }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutContextProvider;
