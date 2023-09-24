"use client"
import { getSingleRecord } from "@/utils/http";
import React, { useContext, useState, useEffect } from "react";
const AppContext = React.createContext(null);

const AppProvider = ({ children }) => {
  const [loader, setLoader] = useState(false);
  const [appLoader, setAppLoader] = useState(false);
  const [id, setId] = useState("");
  const [currentData, setCurrentData] = useState(null);

  const updateLoader = () => {
    setLoader(!loader);
  };

  const fetchResumedata = async (id) => {
    try {
      const data = await getSingleRecord('/resume',id); // Replace with your collection name
     console.log('Data retrieved successfully:', data,id);
     setCurrentData(data)
      return data
    } catch (error) {
      console.error('Error getting data:', error);
    }
  }



  return (
    <AppContext.Provider
      value={{
        loader,
        updateLoader,
        id,
        setId,
        fetchResumedata,currentData
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
