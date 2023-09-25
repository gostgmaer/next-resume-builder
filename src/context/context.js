"use client";
import { getSingleRecord, put } from "@/utils/http";
import React, { useContext, useState, useEffect } from "react";
const AppContext = React.createContext(null);

const AppProvider = ({ children }) => {
  const [loader, setLoader] = useState(false);
  const [appLoader, setAppLoader] = useState(false);
  const [id, setId] = useState("");
  const [currentData, setCurrentData] = useState(null);
  const [activeTab, setActiveTab] = useState("basic info");
  const [resume, setResume] = useState({
    basics: {
      name: "",
      label: "",
      image: "",
      email: "john@gmail.com",
      phone: "(912) 555-4321",
      url: "https://johndoe.com",
      summary: "A summary of John Doe…",
      location: {
        address: "2712 Broadway St",
        postalCode: "CA 94115",
        city: "San Francisco",
        countryCode: "US",
        region: "California",
      },
      profiles: [],
    },
    work: [],
    volunteer: [],
    education: [],
    awards: [],
    certificates: [],
    publications: [],
    skills: [],
    languages: [],
    interests: [],
    references: [],
    projects: [],
  });
  const loaderFalse = () => {
    setLoader(false);
  };
  const loaderTrue = () => {
    setLoader(true);
  };

  const fetchResumedata = async (id) => {
    loaderTrue();
    try {
      const data = await getSingleRecord("/resume", id); // Replace with your collection name
      setCurrentData(data);
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error getting data:", error);
    }
    loaderFalse();
  };

  const updateResumeRecord = async (nav, body, id) => {
    loaderTrue();
    try {
      const response = await put(`/resume/${id}.json`, body);
      setActiveTab(nav);
      console.log("Record updated successfully:", response);
    } catch (error) {
      console.error("Error updating record:", error);
    }
    loaderFalse();
  };

  return (
    <AppContext.Provider
      value={{
        loader,
        loaderFalse,
        loaderTrue,
        updateResumeRecord,
        id,
        setId,
        fetchResumedata,
        currentData,
        activeTab,
        setActiveTab,
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
