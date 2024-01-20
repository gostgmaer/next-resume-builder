import { useGlobalAppContext } from "@/context/context";
import React, { useState, useEffect } from "react";

const Resume = () => {
  const [resumeData, setResumeData] = useState(null);
  const { fetchSingleresume, id } = useGlobalAppContext();

  const fetchResumeData = async () => {
    const res = await fetchSingleresume(id);
    if (res?.result) {
      setResumeData(res.result);
    }
  };

  useEffect(() => {
    if (id) {
      fetchResumeData();
    }
  }, [id]);

  if (!resumeData) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" bg-slate-50 min-w-[8.3in] max-w-[8.3in]  min-h-screen">
      <div className=" min-w-[8.3in] max-w-[8.3in] shadow rounded  min-h-[11.7in] max-h-[11.7in] p-7">
        {/* Basics */}
        <section className="bg-white p-4 shadow-lg rounded my-2 mt-0">
          <h1 className="text-3xl font-bold mb-2">{resumeData.name}</h1>
          <p className="text-xl text-indigo-600 mb-4">
            {resumeData.label}
          </p>
          <p className="mb-2">{resumeData.email}</p>
          <p className="mb-2">{resumeData.phone}</p>
          <p className="mb-2">
            Website:{" "}
            <a
              href={resumeData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              {resumeData.url}
            </a>
          </p>
       {resumeData?.location?.city &&   <p className="mb-2">
            Location: {resumeData.location.city}
            {resumeData.location.region}
            {resumeData.location.countryCode}
          </p>}
        </section>

        {/* Summary */}
        <section className="bg-white p-4 shadow-lg rounded my-2">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <p>{resumeData.summary}</p>
        </section>

        {/* Work Experience */}
        <section className="bg-white p-4 shadow-lg rounded my-2">
          <h2 className="text-xl font-semibold mb-2">Work Experience</h2>
          {resumeData.work.map((job, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">
                {job.position} at {job.name}
              </h3>
              <p className="text-gray-600">
                {job.startDate} - {job.endDate}
              </p>
              <p>{job.summary}</p>
              <ul className="list-disc list-inside">
                {job.highlights.map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>
              <p>
                Website:{" "}
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  {job.url}
                </a>
              </p>
            </div>
          ))}
        </section>

        {/* Add other resume sections (Volunteer, Education, etc.) */}
      </div>
    </div>
  );
};

export default Resume;
