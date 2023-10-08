"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import UserResumes from "@/components/Pages/resumelist/Resumes";
import { useAuthContext } from "@/context/authContext";
const Page = () => {
  const { userId } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!userId) router.push("/auth/login");
  }, [userId, router]);

  return (
    <div className=" py-10">
      <UserResumes />
    </div>
  );
};

export default Page;
