"use client";
import Resumeone from "@/components/ResumeView/Resumeone";
import { useAuthContext } from "@/context/authContext";
import { useGlobalAppContext } from "@/context/context";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  // @ts-ignore
  const { user, userId } = useAuthContext();
  const { loader, id, fetchResumedata, currentData } = useGlobalAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!userId) router.push("/auth/login");
  }, [userId, router]);

  useEffect(() => {
    fetchResumeData();
  }, [id]);
  
  const fetchResumeData = async () => {
    const res = await fetchResumedata(id);
  };

  return (
    <div>
      <div className=" text-white min-h-screen flex  justify-center items-start">
        {currentData ? (
          <Resumeone data={currentData} />
        ) : (
          <div>No Data has been found</div>
        )}
      </div>
    </div>
  );
};

export default Page;
