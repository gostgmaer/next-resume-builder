import { useGlobalAppContext } from "@/context/context";
import { findIndex } from "@/utils/custom";
import React, { useEffect, useState } from "react";

const UserLanguages = ({Languages, setLanguages}) => {
  const {
    fetchResumedata,
    currentData,
    updateResumeRecord,
    activeTab,
    setActiveTab,
    id,
    setId,
  } = useGlobalAppContext();

  const [formData, setFormData] = useState({
    language: "",
    fluency: "",
    scale: "",
  });

  const [selectedYear, setSelectedYear] = useState("");

  // Calculate the last 20 years
  const currentYear = new Date().getFullYear();

  const last20Years = Array.from(
    { length: 20 },
    (_, index) => currentYear - index
  );


  // Handle year input changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    setLanguages([...Languages, formData]);
    setFormData({
      language: "",
      fluency: "",
      scale: "",
    });
    console.log(Languages);
  };

  const handleRemove = (index) => {
    const updatedExperiences = [...Languages];
    updatedExperiences.splice(index, 1);
    setLanguages(updatedExperiences);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var data = {
        last_step: activeTab,
        languages: Languages,
      };
      updateResumeRecord("others", data, id);
    } catch (error) {
      console.error("Error updating record:", error.message);
    }
  };

  const [editIndex, setEditIndex] = useState(-1);

  const handleEdit = (index) => {
    setEditIndex(index);
    const editdata = findIndex(Languages, index);
    setFormData(editdata);
  };

  const handleSaveEdit = () => {
    if (editIndex !== -1) {
      const updatedData = [...Languages];
      updatedData[editIndex] = formData;
      setLanguages(updatedData);
      setEditIndex(-1);
      setFormData({
        language: "",
        fluency: "",
        scale: "",
      });
    }
  };



  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Languages</h2>
      <div className="mb-6 border-b-2 pb-4">
        <div className="mb-4">
          <div className="w-full max-w-screen-xl mx-auto">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <div className="mb-6 flex  items-center gap-10">
                  <div className="w-full ">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="language"
                    >
                      Language
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="English"
                      id="language"
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full ">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="fluency"
                    >
                      Fluency
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Fluency"
                      id="fluency"
                      name="fluency"
                      value={formData.fluency}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-6 flex items-center gap-10">
                  <div className="w-1/2 ">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="last_used"
                    >
                      Profeciancy
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                      id="scale"
                      name="scale"
                      value={formData.scale}
                      onChange={handleChange}
                    >
                      <option value="">Select a Year</option>
                      {last20Years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                {editIndex === -1 ? (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleAdd}
                  >
                    Add Language
                  </button>
                ) : (
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleSaveEdit}
                  >
                    Update Language
                  </button>
                )}
              </div>
            </form>
            <div className="flex flex-wrap">
              {Languages.map((project, index) => (
                <LanguageCard
                  key={index}
                  {...project}
                  onEdit={() => handleEdit(index)}
                  onDelete={() => handleRemove(index)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              setFormData({
                language: "",
                fluency: "",
                scale: "",
              });
            }}
          >
            Clear
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserLanguages;

const LanguageCard = ({ language, fluency, scale, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-4 p-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{language}</h2>
        <p className="text-gray-600">Fluency: {fluency}</p>
        <p className="text-gray-600">Scale: {scale}</p>
      </div>
      <div className="mt-auto">
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
