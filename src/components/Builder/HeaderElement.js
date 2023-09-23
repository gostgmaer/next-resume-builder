"use client";
import { builderHeader } from "@/assets/data";
import React, { useState } from "react";
import ShowElements from "./ShowElements";

const HeaderElement = () => {
  const [activeTab, setActiveTab] = useState("basic info");
  const [isDivVisible, setIsDivVisible] = useState(false);

  const handleTabClick = (tabName) => {
    if (activeTab !== tabName) {
      setActiveTab(tabName);
      setIsDivVisible(!isDivVisible);
      console.log(tabName);
    }
  };

  return (
    <div>
      <div className=" p-4 flex justify-between items-center">
        {builderHeader.map((item) => {
          return (
            <div
              key={item.id}
              className={`cursor-pointer px-4 py-1   ${
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

      <div className="bg-white p-4 text-black mt-4">
       <ShowElements currentTab={activeTab} />
      </div>
    </div>
  );
};

export default HeaderElement;
