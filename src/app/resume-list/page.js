"use client";
import Profile from "@/components/Pages/resumelist/Resumes";
import { useAuthContext } from "@/context/authContext";
import { get } from "@/utils/http";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  // Replace this with the actual data from your JSON
  // @ts-ignore
  const { user } = useAuthContext();
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
  React.useEffect(() => {
    if (user == null) router.push("/login");
  }, [user]);

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
