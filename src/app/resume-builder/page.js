"use client";
import HeaderElement from "@/components/Builder/FormElement";
import { useAuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  // @ts-ignore
  const { user } = useAuthContext();
  const router = useRouter();
  // React.useEffect(() => {
  //   if (user == null) router.push("/login");
  // }, [user]);

  return (
    <div>
      <div className=" text-white min-h-screen flex  justify-center items-start">
        <HeaderElement />
      </div>
    </div>
  );
};

export default Page;
