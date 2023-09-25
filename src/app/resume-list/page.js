"use client";
import Profile from "@/components/Pages/resumelist/Resumes";
import { get } from "@/utils/http";
import React, { useEffect, useState } from "react";

const Page = () => {
  // Replace this with the actual data from your JSON
  const [list, setList] = useState(undefined);

  // var profileData = [];
  const fetchResumeData = async () => {
    const data = await get("resume");
    console.log(Object.values(data));
    setList(Object.keys(data).map((id) => ({
        id,
        ...data[id],
      })));
    // const profilesArray = Object.keys(data).map((id) => ({
    //     id,
    //     ...data[id],
    //   }));
      
    //   console.log(profilesArray);
    // profileData=data
  };

  useEffect(() => {
    fetchResumeData();
  }, []);

  if (list) {
    return (
      <div>
        {list?.map((profileData, index) => {
          return <Profile key={index} profileData={profileData} />;
        })}
      </div>
    );
  }
};

export default Page;
