import { useGlobalAppContext } from "@/context/context";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ResumeItem = ({ user }) => {
  const {
    fetchResumedata,
    currentData,
    updateResumeRecord,
    activeTab,
    setActiveTab,
    id,
    setId,
  } = useGlobalAppContext();

  const router = useRouter();
  const EditID = () => {
    setId(user.id);
    router.push("/resume-builder");
  };
  const viewResume = () => {
    setId(user.id);
    router.push("/resume");
  };

  // useEffect(() => {
  //   if (profileData.id === id) {
  //     router.push("/resume-builder");
  //   }
  // }, [id]);

  return (
    <div className="border p-4 flex flex-col bg-slate-50 rounded-lg md:flex-row justify-between items-center">
      <div className="flex items-center">
        <Image
          height={200}
          width={200}
          src={user.image}
          alt={`Profile of ${user.name}`}
          className="w-40 h-40 rounded-full object-cover mr-4"
        />
        <div>
          <h2 className="text-xl font-semibold">Name: {user.name}</h2>
          <p className=" font-medium">Resume Id: {user.id}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Position: {user.position}</p>

          <p>
            Created Time:{" "}
            {moment(user.created_time).format("Do MMM YYYY, h:mm a")}
          </p>
          <p>
            Updated Time:{" "}
            {moment(user.updated_time).format("Do MMM YYYY, h:mm a")}
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
        <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ResumeItem;
