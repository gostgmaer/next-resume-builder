import Modal from "@/components/global/Modal";
import PaginationBlock from "@/components/global/block/pagination/paginationBlock";

import { appId, resumeContainer } from "@/config/setting";
import { useAuthContext } from "@/context/authContext";
import { useGlobalAppContext } from "@/context/context";
import { del, get } from "@/lib/http";

import moment from "moment";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const UserResumes = () => {
  const router = useRouter();
  const { data: session } = useSession()
  const {
    fetchResumeData,
    page,limit,
    setId, list,setLimit,setPage,setActiveTab
  } = useGlobalAppContext();

  useEffect(() => {
    if (session) {
      fetchResumeData();
    }
  }, [session,page,limit]);

  const handleNewResume = () => {
    setId(undefined);
    setActiveTab("basic info")
    router.push("/resume-builder");
  };

  return (
    <div className="container text-black mx-auto">
      <div className="flex justify-between items-center py-5">
        <h1 className="text-2xl font-semibold mb-4">Resume List</h1>

        <button
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          onClick={handleNewResume}
        >
          Create New Resume
        </button>
      </div>
      {!list?.result ? (
        <div className="space-y-2 bg-white text-center p-5 py-20 text-black text-lg rounded-lg">
          <h2>No resume is Found please create a resume</h2>
        </div>
      ) : (
       <div className="">
         <div className="space-y-2 bg-white p-2 rounded-lg max-h-[480px] overflow-auto">
          {list?.result?.map((resume, index) => (
            <ResumeItem key={index} data={resume} />
          ))}
        </div>
        <div className=" bg-gray-800 py-1 text-white mt-10">
        <PaginationBlock totalItems={list.total_record} limit={limit} currentPage={page} setPage={setPage} setLimit={setLimit}   />
        </div>
       </div>
       
      )}
    </div>
  );
};

export default UserResumes;

const ResumeItem = ({ data }) => {

  const {
    fetchResumeData,
    setId, openModal, closeModal
  } = useGlobalAppContext();

  const router = useRouter();

  const EditID = (id) => {
    setId(data._id);
    router.push(`/resume/${data._id}/edit`);
  };

  const viewResume = (id) => {
    setId(data._id);
    router.push(`/resume/${data._id}`);
  };

  const openDeleteModal = () => {
    openModal();
  };

  const deleteResumeFunction = async () => {
    const request = await del(`/resumes`, data._id)
    closeModal()
    console.log(request);
    fetchResumeData();

  };

  return (
    <div className="border p-4 flex flex-col bg-slate-50 rounded-lg md:flex-row justify-between items-start">
      <div className="flex items-center">
        {data.image && (
          <Image
            height={200}
            width={200}
            src={data.image}
            alt={`Profile of ${data.name}`}
            className="w-40 h-40 rounded-full object-cover mr-4"
          />
        )}
        <div>
          <h2 className="text-xl font-semibold">Name: {data.name}</h2>
          <p className=" font-medium">Resume Id: {data["_id"]}</p>
          <p>Email: {data.email}</p>
          <p>Phone: {data.phone}</p>
          <p>Position: {data.position}</p>

          <p>
            Created Time:{" "}
            {moment(data.created_time).format("Do MMM YYYY, h:mm a")}
          </p>
          <p>
            Last Updated:{" "}
            {moment(data.updated_time).format("Do MMM YYYY, h:mm a")}
          </p>
        </div>
      </div>
      <div className="mt-2 md:mt-0  flex items-start flex-col gap-2">
        <Link
          href={`/resume/${data["_id"]}`}
          className="bg-blue-500 text-white px-2 text-center  py-2 rounded hover:bg-blue-600"
        >
          <FaEye/>
        </Link>
        <Link
      href={`/resume/${data["_id"]}/view`}
          className="bg-yellow-500 text-white px-2  py-1 rounded hover:bg-yellow-600"
          onClick={EditID}
        >
          <FaEdit/>
        </Link>
        <button
          onClick={openDeleteModal}
          className="bg-red-500 text-white px-2  py-2 rounded hover:bg-red-600"
        >
        <FaTrash/>
        </button>
      </div>
      <Modal>
        <div className=" w-full">
          <h2 className=" w-full">Are you sure want to delete this resume?</h2>
          <div className="flex mt-10 justify-center gap-2">
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              onClick={deleteResumeFunction}
            >
              Yes
            </button>
            <button
              onClick={closeModal}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
