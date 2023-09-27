"use client";
import Profile from "@/components/Pages/resumelist/Resumes";
import { useAuthContext } from "@/context/authContext";
import { get } from "@/utils/http";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import moment from "moment";
import ResumeItem from "@/components/Pages/resumelist/Resumes";
import Link from "next/link";
import { useGlobalAppContext } from "@/context/context";
const Page = () => {
  // Replace this with the actual data from your JSON
  // @ts-ignore
  const { user } = useAuthContext();
  const {
    fetchResumedata,
    currentData,
    updateResumeRecord,
    activeTab,
    setActiveTab,
    id,
    setId,
  } = useGlobalAppContext();
  const [list, setList] = useState(undefined);

  // var profileData = [];
  const fetchResumeData = async () => {
    const data = await get("resume", { uid: user?.uid });

    setList(
      Object.keys(data).map((id) => ({
        id,
        ...data[id],
      }))
    );
  };

  useEffect(() => {
    fetchResumeData();
  }, []);

  const router = useRouter();

  const handleNewResume = () => {
    setId(undefined);
    router.push("/resume-builder");
  };


  React.useEffect(() => {
    if (user == null) router.push("/login");
  }, [user]);




  if (list) {
    return (
      <div className=" py-10">
        <div className="container text-black mx-auto">
          <div className="flex justify-between items-center py-5">
            <h1 className="text-2xl font-semibold mb-4">Resume List</h1>

            <button
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600" onClick={handleNewResume}
            >
              Create New Resume
            </button>
          </div>
          <div className="space-y-2 bg-white p-2 rounded-lg">
            {list?.map((resume, index) => (
              <ResumeItem key={index} user={resume} />
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default Page;
