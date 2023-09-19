"use client";

import { useState, useContext, createContext } from "react";

const StateContext = createContext();

const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [activeMenu, setActiveMenu] = useState(true);

  return (
    <StateContext.Provider
      value={{
        screenSize,
        setScreenSize,
        activeMenu,
        setActiveMenu,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
export default ContextProvider;
