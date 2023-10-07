import Modal from "@/components/global/Modal";
import { firebaseDatabaseConn } from "@/config/firebase";
import { useAuthContext } from "@/context/authContext";
import { useGlobalAppContext } from "@/context/context";
import { get } from "@/lib/http";
import Loader from "@/utils/Loader";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserResumes = () => {
  const router = useRouter();
  const { user, userId } = useAuthContext();
  // Replace this with the actual data from your JSON
  // @ts-ignore

  const {
    fetchResumedata,
    currentData,
    updateResumeRecord,
    activeTab,
    setActiveTab,
    id,
    setId,
  } = useGlobalAppContext();
  const [list, setList] = useState(undefined);

  // var profileData = [];
  const fetchResumeData = async () => {
    const data = await get("/resume");

    setList(data)
   
  };

  useEffect(() => {
    if (userId?.user_id) {
      fetchResumeData();
    }
  }, [userId?.user_id]);

  const handleNewResume = () => {
    setId(undefined);
    router.push("/resume-builder");
  };

  if (!list) {
    return <Loader />;
  }

  // useEffect(() => {
  //   if (!userId) {
  //     router.push("/login");
  //   }
  // }, [userId]);

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
      <div className="space-y-2 bg-white p-2 rounded-lg">
        {list.result?.map((resume, index) => (
          <ResumeItem key={index} data={resume} />
        ))}
      </div>
    </div>
  );
};

export default UserResumes;

const ResumeItem = ({ data }) => {
  console.log(data);
  const {
    fetchResumedata,
    currentData,
    updateResumeRecord,
    activeTab,
    setActiveTab,
    id,
    setId,
    isModalOpen,
    openModal,
    closeModal,
  } = useGlobalAppContext();

  const router = useRouter();
  const EditID = () => {
    setId(data._id);
    router.push("/resume-builder");
  };
  const viewResume = () => {
    setId(data._id);
    router.push("/resume");
  };

  const openDeleteModal = () => {
    openModal();
  };

  const deleteResumeFunction = () => {
    console.log(data);
  };

  return (
    <div className="border p-4 flex flex-col bg-slate-50 rounded-lg md:flex-row justify-between items-center">
      <div className="flex items-center">
        <Image
          height={200}
          width={200}
          src={data.image}
          alt={`Profile of ${data.name}`}
          className="w-40 h-40 rounded-full object-cover mr-4"
        />
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
            Updated Time:{" "}
            {moment(data.updated_time).format("Do MMM YYYY, h:mm a")}
          </p>
        </div>
      </div>
      <div className="mt-2 md:mt-0 space-x-2">
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          onClick={viewResume}
        >
          View
        </button>
        <button
          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
          onClick={EditID}
        >
          Edit
        </button>
        <button
          onClick={openDeleteModal}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          Delete
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
