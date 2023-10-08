"use client"
import Personal from "@/components/Pages/profile/profile";
import { useAuthContext } from "@/context/authContext";
import { useGlobalAppContext } from "@/context/context";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Profile ({data}) {


  const { user, userId } = useAuthContext();
  const { loading } = useGlobalAppContext();
  const router = useRouter();
  
  useEffect(() => {
    if (!userId) router.push("/auth/login");
  }, [userId,router]);

  return <Personal />;
};


// export async function getServerSideProps() {
//   const res = await fetch('https://api.github.com/repos/vercel/next.js')
//   const data = await res.json()
//   return { props: { data } }
// }