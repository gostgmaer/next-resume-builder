// @ts-nocheck
"use client";
import ResumeBlock from "@/components/Builder/FormElement";
import { useAuthContext } from "@/context/authContext";
import { useGlobalAppContext } from "@/context/context";
import { useAxios } from "@/lib/interceptors";
import Loader from "@/utils/loader/Loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = (req, res) => {
  const { data: session } = useSession()
  const route = useRouter()


  return (
    <div className=" text-white min-h-screen flex  justify-center items-start w-full">
      <div className="w-2/3 m-auto">

        <div className="bg-white flex justify-center text-black rounded">

          <ResumeBlock />

        </div>
      </div>
    </div>
  );
};

export default Page;





// export const getAuth = async (ctx) => {
//   const { data: session } = useSession()
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth/signin",
//         permanent: false,
//       },
//     };
//   }
//   const { id } = ctx.params;
//   const cookies = parse(ctx.req.headers.cookie || "");
//   const token = cookies["headerPayload"] + "." + cookies["signature"];
//   const params = {
//     method: "get",
//     token: token,
//   };
//   const data = await serverMethod(`/users/${id}`, params);

//   return {
//     props: {
//       data,session
//     },
//   };
// };
