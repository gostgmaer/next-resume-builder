"use client";

import { get, patch } from "@/lib/http";
import React, { useContext, useState, useEffect } from "react";
const AppContext = React.createContext(null);

const AppProvider = ({ children }) => {
  const [loader, setLoader] = useState(false);
  const [appLoader, setAppLoader] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [activeTab, setActiveTab] = useState("basic info");
  const [id, setId] = useState(undefined);
  const [resume, setResume] = useState({
    basics: {
      name: "",
      position: "",

      linkedin: "",
      github: "",
      website: "",

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

    name: "",
    position: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    website: "",

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const loaderFalse = () => {
    setLoader(false);
  };
  const loaderTrue = () => {
    setLoader(true);
  };

  const fetchResumedata = async (id) => {
    loaderTrue();
    try {
      const data = await get("/resume",{} ,id); // Replace with your collection name
      setCurrentData(data?.result.last_step);
      console.log(data.result);
      return data;
    } catch (error) {
      console.error("Error getting data:", error);
    }
    loaderFalse();
  };

  const updateResumeRecord = async (nav, body, id) => {
    loaderTrue();
    try {
      const response = await patch(`/resume`, body,id);
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
        resume,
        setResume,
        isModalOpen,
        openModal,
        closeModal,
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
