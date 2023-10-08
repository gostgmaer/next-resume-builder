"use client";
import ResumeBlock from "@/components/Builder/FormElement";
import { useAuthContext } from "@/context/authContext";
import { useGlobalAppContext } from "@/context/context";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  // @ts-ignore
  const { user, userId } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!userId) router.push("/auth/login");
  }, [userId, router]);

  return (
    <div>
      <div className=" text-white min-h-screen flex  justify-center items-start">
        <ResumeBlock />
      </div>
    </div>
  );
};

export default Page;
