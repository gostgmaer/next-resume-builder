"use client";
import { builderHeader } from "@/assets/data";
import React, { useState } from "react";
import ShowElements from "./ShowElements";
import { useGlobalAppContext } from "@/context/context";

const ResumeBlock = ({data}) => {
  const {
    fetchResumedata,
    currentData,
    updateResumeRecord,
    activeTab,
    setActiveTab,
  } = useGlobalAppContext();
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [id, setId] = useState("");

  const handleTabClick = (tabName) => {
    if (activeTab !== tabName) {
      setActiveTab(tabName);
      setIsDivVisible(!isDivVisible);
    }
  };

  // console.log(data);

  return (
    <div className=" w-2/3 m-auto">
      <div className=" p-4 flex justify-between items-center">
        {builderHeader.map((item) => {
          return (
            <div
              key={item.id}
              className={`cursor-pointer px-4 py-1 capitalize  ${
                activeTab === item.value
                  ? "scale-105 border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-900 hover:text-gray-500 "
              }`}
              onClick={() => handleTabClick(item.value)}
            >
              {item.name}
            </div>
          );
        })}
      </div>

      <div className="bg-white flex justify-center text-black rounded">
        <ShowElements currentTab={activeTab} data={data} />
      </div>
    </div>
  );
};

export default ResumeBlock;
