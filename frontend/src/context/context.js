"use client";

import { appId, resumeContainer } from "@/config/setting";
import { get, getsingle, patch } from "@/lib/http";
import React, { useContext, useState, useEffect } from "react";
const AppContext = React.createContext(null);

const AppProvider = ({ children }) => {
  const [loader, setLoader] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [activeTab, setActiveTab] = useState("basic info");
  const [id, setId] = useState(undefined);
  const [list, setList] = useState(undefined);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

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

  const fetchSingleresume = async (id) => {

    try {
      const data = await getsingle(`/resumes`, {}, id); // Replace with your collection name
      setCurrentData(data);
      // setActiveTab(data.result.last_step)
      return data;
    } catch (error) {
      console.error("Error getting data:", error);
      return error
    }

  };

  const updateResumeRecord = async (nav, body, id) => {

    try {
      const response = await patch(`/resumes`, body, id);
      setActiveTab(nav);
      console.log("Record updated successfully:", response);
    } catch (error) {
      console.error("Error updating record:", error);
    }

  };

  const fetchResumeData = async () => {
    const query = {
      page: page, limit: limit
    }
    const data = await get(`/resumes`, query);
    setList(data);
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
        fetchSingleresume,
        currentData, fetchResumeData,
        activeTab,
        setActiveTab,
        isModalOpen,
        openModal,
        closeModal, list, setList, page, limit, setLimit, setPage
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
