"use client";
import Resumeone from "@/components/ResumeView/Resumeone";
import { useAuthContext } from "@/context/authContext";
import { useGlobalAppContext } from "@/context/context";
import { getsingle } from "@/lib/http";
import { useAxios } from "@/lib/interceptors";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";




const Page = () => {

 const { fetchSingleresume,currentData } = useGlobalAppContext();

  // const { user, userId } = useAuthContext();
  const [data, setData] = useState(null);
  const router = useRouter();
  const param = useParams();
  const [axios, spinner] = useAxios();

  console.log(param);
  // const fetchResumeData = async () => {
  //   const res = await getsingle("/resumes", {}, param.id);
  //   setData(res);
  // };

  // useEffect(() => {
  //   if (!userId) router.push("/auth/login");
  // }, [userId, router]);

  useEffect(() => {
    fetchSingleresume(param.id);
  }, [param.id]);

  if (!currentData) {
    return <div className=" text-black min-h-screen flex  justify-center items-start">Loading...</div>;
  }

  if (!currentData?.result) {
    return <div className=" text-black min-h-screen flex  justify-center items-start">No Data has been found</div>;
  }
  return (
    <div>
      <div className=" text-black min-h-screen flex justify-center items-start">
        {currentData && <Resumeone data={currentData.result} />}
      </div>
  
    </div>
  );
};

export default Page;
