"use client";

import Personal from "@/components/Pages/profile/profile";
import { useAuthContext } from "@/context/authContext";
import { useGlobalAppContext } from "@/context/context";
import Loader from "@/utils/Loader";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Profile = () => {
  // @ts-ignore
  const { user, userId } = useAuthContext();
  const { loading } = useGlobalAppContext();
  const router = useRouter();

  if (loading) {
    return <Loader />;
  }
  return <Personal />;
};

export default Profile;
