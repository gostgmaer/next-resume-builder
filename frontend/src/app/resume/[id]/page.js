
// import Resumeone from "@/components/ResumeView/Resumeone";
// import { useAuthContext } from "@/context/authContext";
// import { useGlobalAppContext } from "@/context/context";
// import { serverMethod } from "@/lib/http";
// import { useAxios } from "@/lib/interceptors";

import Resumeone from "@/components/ResumeView/Resumeone";
import { serverMethod } from "@/lib/serverMethod";
import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";




const Page = async (props) => {

//  const { fetchSingleresume,currentData } = useGlobalAppContext();

  // const { user, userId } = useAuthContext();
  // const [data, setData] = useState(null);
  // const router = useRouter();
  // const param = useParams();
  // const [axios, spinner] = useAxios();

  // console.log(param);

  const request = await fetchSingleResume(props.params.id)
  console.log("request",request);
  // const fetchResumeData = async () => {
  //   const res = await getsingle("/resumes", {}, param.id);
  //   setData(res);
  // };

  // useEffect(() => {
  //   if (!userId) router.push("/auth/login");
  // }, [userId, router]);

  // useEffect(() => {
  //   fetchSingleresume(param.id);
  // }, [param.id]);

console.log("props",props);

  if (!request) {
    return <div className=" text-black min-h-screen flex  justify-center items-start">Loading...</div>;
  }

  if (!request) {
    return <div className=" text-black min-h-screen flex  justify-center items-start">No Data has been found</div>;
  }
  return (
    <div>
      <div className=" text-black min-h-screen flex justify-center items-start">
        {request.result && <Resumeone data={request.result} />}
      </div>
  
    </div>
  );
};

export default Page;


export const fetchSingleResume = async (id)=>{

  const param ={
    method: "get",
    header: {},
  }
  const result = await serverMethod(`/resumes/${id}`,param)
  return result
}