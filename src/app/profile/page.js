// pages/Profile.js
"use client";
import { useAuthContext } from "@/context/authContext";
import Image from "next/image";
import React, { useState } from "react";

const Profile = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("info"); // Initially, show user info
  // @ts-ignore
  const { user } = useAuthContext();
  const handleMenuItemClick = (item) => {
    setSelectedMenuItem(item);
  };


  return (
    <div className="container mx-auto py-8 text-black">
      <h1 className="text-3xl font-semibold mb-4">My Profile</h1>
      <Image
        width={100}
        height={100}
        src={
          user?.picture ? user?.picture : "https://source.unsplash.com/random"
        }
        style={{ borderRadius: "50%",height:'100px' }}
        alt=""
      />
    </div>
  );
};

export default Profile;
