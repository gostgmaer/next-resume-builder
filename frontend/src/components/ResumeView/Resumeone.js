import Image from "next/image";
import React from "react";
import { PrintPage } from "../global/block/print";

const Resumeone = ({ data }) => {


  return (
    <div className="min-w-[8.3in] max-w-[8.3in]  my-5 print:m-0 ">
     <PrintPage/>
      <div className="bg-white text-black min-h-[11.7in]  p-7 shadow-lg rounded print:px-10 print:py-10">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="md:mr-8">
            {data.image && (
              <Image
                width={100}
                height={100}
                src={data?.image}
                alt={data?.name}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto md:mx-0"
              />
            )}
            <h1 className="text-3xl font-semibold text-center md:text-left mt-4">
              {data.name}
            </h1>
            <p className="text-gray-600 text-center md:text-left">
              {data.position}
            </p>
            <div className="mt-4 text-center md:text-left">
              <a
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                LinkedIn
              </a>
              {" | "}
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHub
              </a>
            </div>
            <p className="mt-2 text-center md:text-left">
              Email: {data.email}
              <br />
              Phone: {data.phone}
            </p>
          </div>
          <div className="mt-8 md:mt-0">
            <h2 className="text-xl font-semibold">Overview</h2>
            <p>{data.overview}</p>
          </div>
        </div>
        <div className="mt-8 md:mt-0 flex justify-between gap-5">
          <div>
            <h2 className="text-xl font-semibold">Education</h2>
            <ul className="mt-2 list-disc pl-4">
              {data?.education?.map((edu, index) => (
                <li key={index}>
                  <p className="font-semibold">{edu.educationTitle}</p>
                  <p>{edu.schoolName}</p>
                  <p>
                    {edu.startDate} - {edu.endDate}
                  </p>
                  <p>Percentage: {edu.percentage}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mt-4">Skills</h2>
            <ul className="mt-2 list-disc pl-4">
              {data?.skills?.map((skill, index) => (
                <li key={index}>
                  <p className="font-semibold">{skill.name}</p>
                  <p>Years of Experience: {skill.total_years}</p>
                  <p>Last Used: {skill.last_used}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Work Experience</h2>
          <ul className="mt-2">
            {data?.work?.map((exp, index) => (
              <li key={index} className="mb-4">
                <p className="font-semibold">{exp.title}</p>
                <p>{exp.company}</p>
                <p>
                  {exp.startDate} - {exp.endDate}
                </p>
                <p>{exp.location}</p>
                <p>
                  <a
                    href={exp.experienceLetter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Experience Letter
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Projects</h2>
          <ul className="mt-2">
            {data?.projects?.map((project, index) => (
              <li key={index} className="mb-4">
                <p className="font-semibold">{project.projectTitle}</p>
                <p>{project.overview}</p>
                <p>
                  <a
                    href={project.deployedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Deployed Link
                  </a>
                </p>
                <p>
                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Repository Link
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Resumeone;
