import { useGlobalAppContext } from "@/context/context";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Profile = ({ profileData }) => {
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
    setId(profileData.id);
    router.push("/resume-builder");
  };

  // useEffect(() => {
  //   if (profileData.id === id) {
  //     router.push("/resume-builder");
  //   }
  // }, [id]);

  return (
    <div className="bg-gray-100 p-4 text-black rounded-lg shadow-lg">
      <div className="bg-gray-100 p-4 text-black rounded-lg shadow-lg">
        <div>
          <h1 className="text-2xl font-bold mb-2">{profileData.name}</h1>
          <h2>{profileData.id}</h2>
          <p className="mb-2">Email: {profileData.email}</p>
          <p className="mb-2">Phone: {profileData.phone}</p>
          <p className="mb-2">Position: {profileData.position}</p>
          <p className="mb-2">Website: {profileData.website}</p>
          <p className="mb-2">LinkedIn: {profileData.linkedin}</p>
          <p className="mb-2">GitHub: {profileData.github}</p>

          <h2 className="text-lg font-semibold mt-4 mb-2">Experiences:</h2>
          <ul className="list-disc pl-4">
            {profileData?.experiances?.map((experience, index) => (
              <li key={index} className="mb-2">
                <strong>{experience.company}</strong>
                <p className="mb-1">Title: {experience.title}</p>
                <p className="mb-1">Location: {experience.location}</p>
                <p className="mb-1">Start Date: {experience.startDate}</p>
                <p className="mb-1">End Date: {experience.endDate}</p>
                <p className="mb-1">
                  Experience Letter:{" "}
                  <a
                    href={experience.experienceLetter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {experience.experienceLetter}
                  </a>
                </p>
              </li>
            ))}
          </ul>

          <h2 className="text-lg font-semibold mt-4 mb-2">Education:</h2>
          <ul className="list-disc pl-4">
            {profileData?.education?.map((edu, index) => (
              <li key={index} className="mb-2">
                <strong>{edu.educationTitle}</strong>
                <p className="mb-1">School Name: {edu.schoolName}</p>
                <p className="mb-1">Start Date: {edu.startDate}</p>
                <p className="mb-1">End Date: {edu.endDate}</p>
                <p className="mb-1">Percentage: {edu.percentage}</p>
              </li>
            ))}
          </ul>

          <h2 className="text-lg font-semibold mt-4 mb-2">Skills:</h2>
          <ul className="list-disc pl-4">
            {profileData?.skill?.map((skill, index) => (
              <li key={index} className="mb-2">
                <strong>{skill.name}</strong>
                <p className="mb-1">Total Years: {skill.total_years}</p>
                <p className="mb-1">Last Used: {skill.last_used}</p>
                <p className="mb-1">Scale: {skill.scale}</p>
              </li>
            ))}
          </ul>
        </div>
        <button
          className=" text-red-50 bg-slate-700 p-10 rounded"
          onClick={EditID}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Profile;
