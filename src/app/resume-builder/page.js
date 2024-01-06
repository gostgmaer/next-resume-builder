// @ts-nocheck
"use client";
import ResumeBlock from "@/components/Builder/FormElement";
import { useAuthContext } from "@/context/authContext";
import { useGlobalAppContext } from "@/context/context";
import { useAxios } from "@/lib/interceptors";
import Loader from "@/utils/loader/Loader";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  // @ts-ignore
  const { user, userId } = useAuthContext();
  // const { loader, loaderTrue, loaderFalse } = useGlobalAppContext();
  const [axios, spinner] = useAxios();
  const router = useRouter();

  // useEffect(() => {
  //   if (!userId) router.push("/auth/login");
  // }, [userId, router]);

  return (
    <div>
      <div className=" text-white min-h-screen flex  justify-center items-start">
        <ResumeBlock />
        {spinner}
      </div>
    </div>
  );
};

export default Page;
