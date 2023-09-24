"use client"
import React, { useContext, useState, useEffect } from "react";
const AppContext = React.createContext(null);

const AppProvider = ({ children }) => {
  const [loader, setLoader] = useState(false);
  const [appLoader, setAppLoader] = useState(false);
  const [id, setId] = useState("");

  const updateLoader = () => {
    setLoader(!loader);
  };

  return (
    <AppContext.Provider
      value={{
        loader,
        updateLoader,
        id,
        setId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalAppContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
