import React, { useState } from 'react';

const ExperienceCard = ({
  title,
  name,
  company,
  experienceLetter,
  location,
  startDate,
  endDate,
  onEdit,
  onDelete,
}) => {

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-4 p-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-600">{company}</p>
        <p className="text-gray-600">{location}</p>
        <p className="text-gray-600">
          {startDate} - {endDate}
        </p>
      </div>
      <div className="mt-auto">
        <a
          href={experienceLetter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline block mb-2"
        >
          View Experience Letter
        </a>
        <div className="flex justify-between">
          <button
            onClick={() => onEdit()}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete()}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 ml-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
