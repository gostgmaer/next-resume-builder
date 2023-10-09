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
  // @ts-ignore

  const { user, userId } = useAuthContext();
  const [data, setData] = useState(null);
  const router = useRouter();
  const param = useParams();
  const [axios, spinner] = useAxios();

  console.log(param);
  const fetchResumeData = async () => {
    const res = await getsingle("/resume", {}, param.id);
    setData(res);
  };

  useEffect(() => {
    if (!userId) router.push("/auth/login");
  }, [userId, router]);

  useEffect(() => {
    fetchResumeData();
  }, [param.id]);

  if (!data) {
    return <div className=" text-black min-h-screen flex  justify-center items-start">Loading...</div>;
  }

  if (!data?.result) {
    return <div className=" text-black min-h-screen flex  justify-center items-start">No Data has been found</div>;
  }
  return (
    <div>
      <div className=" text-black min-h-screen flex  justify-center items-start">
        {data && <Resumeone data={data.result} />}
      </div>
      {spinner}
    </div>
  );
};

export default Page;
