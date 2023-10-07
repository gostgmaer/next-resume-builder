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
import Loader from "@/utils/Loader";
import UserResumes from "@/components/Pages/resumelist/Resumes";
const Page = () => {
  const { user, userId } = useAuthContext();
  const router = useRouter();

  return (
    <div className=" py-10">
      <UserResumes />
    </div>
  );
};

export default Page;
