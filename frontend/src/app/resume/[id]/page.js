
import Resumeone from "@/components/ResumeView/Resumeone";
import { serverMethod } from "@/lib/serverMethod";
import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";



const Page = async (props) => {

const request = await fetchSingleResume(props.params.id)

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