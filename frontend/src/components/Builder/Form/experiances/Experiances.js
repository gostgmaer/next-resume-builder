import { useGlobalAppContext } from "@/context/context";

import React, { useEffect, useState } from "react";
import ExperienceCard from "./Card";
import { findIndex } from "@/utils/custom";
import { patch } from "@/lib/http";

const Experiances = (props) => {
  const {
    fetchSingleresume,
    currentData,
    updateResumeRecord,
    activeTab,
    setActiveTab,
    loader,
    id,
    setId,
  } = useGlobalAppContext();


  const [expriance, setExpriance] = useState([]);
  const [currentExperience, setCurrentExperience] = useState({
    position: "",
    name: "",
    company: "",
    experienceLetter: "",
    location: "",
    startDate: "",
    endDate: "",
    url: "",
    summary: "",
    highlights: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentExperience({ ...currentExperience, [name]: value });
  };

  const handleAddExperience = () => {
    setExpriance([...expriance, currentExperience]);
    setCurrentExperience({
      position: "",
      name: "",
      company: "",
      experienceLetter: "",
      location: "",
      startDate: "",
      endDate: "",
      url: "",
      summary: "",
      highlights: [],
    });
  };

  // const handleEdit = (experience) => {
  //   // Handle edit action here (e.g., open an edit modal)
  //   console.log(`Editing ${experience.title}`);
  // };

  const handleRemoveExperience = (index) => {
    const updatedExperiences = [...expriance];
    updatedExperiences.splice(index, 1);
    setExpriance(updatedExperiences);
  };

  const [editIndex, setEditIndex] = useState(-1);

  const handleEdit = (index) => {
    setEditIndex(index);
    const editdata = findIndex(expriance, index);
    setCurrentExperience(editdata);
  };
  const handleSaveEdit = () => {
    if (editIndex !== -1) {
      const updatedData = [...expriance];
      updatedData[editIndex] = currentExperience;
      setExpriance(updatedData);
      setEditIndex(-1);
      setCurrentExperience({
        position: "",
        name: "",
        company: "",
        experienceLetter: "",
        location: "",
        startDate: "",
        endDate: "",
        url: "",
        summary: "",
        highlights: [],
      });
    }
  };

  const updateRecord = async () => {
    try {
      // Replace '/yourCollectionName/${recordId}.json' with your desired API endpoint
      const extra = {
        last_step: activeTab,
        work: expriance,
      };
      var expriances = {
        last_step: activeTab,
        work: expriance,
      };
      const response = await  updateResumeRecord("education", expriances, id);
      // setActiveTab("education");
      return response;
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to save the form data here
    console.log(expriance);
    try {
      updateRecord(); // Replace with your collection name
    } catch (error) {
      console.error("Error getting data:", error);
    }
  };

  const fetchResumeData = async () => {
    const response = await fetchSingleresume(id);
   
    if (response?.result?.work) {
      setExpriance(response.result.work);
    }
  };

  useEffect(() => {
    if (id) {
      fetchResumeData();
    }
  }, [id]);

 

  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
      <div className="mb-6 border-b-2 pb-4">
        <div className="mb-4">
          <div className="w-full max-w-screen-xl mx-auto">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <div className="mb-6 flex  items-center gap-10">
                  <div className="w-full ">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="name"
                    >
                      Position
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Name"
                      id="name"
                      name="name"
                      value={currentExperience.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full ">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="company"
                    >
                      Company
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Company"
                      id="company"
                      name="company"
                      value={currentExperience.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-6 flex items-center gap-10">
                  <div className="w-1/2 ">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="experienceLetter"
                    >
                      Experience Letter
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Experience Letter"
                      id="experienceLetter"
                      name="experienceLetter"
                      value={currentExperience.experienceLetter}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-1/2 ">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="location"
                    >
                      Location
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Location"
                      id="location"
                      name="location"
                      value={currentExperience.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-6 flex items-center gap-10">
                  <div className="w-full ">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="startDate"
                    >
                      Start Date
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="date"
                      placeholder="Start Date"
                      id="startDate"
                      name="startDate"
                      value={currentExperience.startDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full ">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="endDate"
                    >
                      End Date
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="date"
                      placeholder="End Date"
                      id="endDate"
                      name="endDate"
                      value={currentExperience.endDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="summary"
                >
                  Descriptions
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Descriptions...."
                  id="summary"
                  name="summary"
                  value={currentExperience.summary}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                {editIndex === -1 ? (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleAddExperience}
                  >
                    Add Experience
                  </button>
                ) : (
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleSaveEdit}
                  >
                    Update Experience
                  </button>
                )}
              </div>
            </form>
            <div className="flex flex-wrap">
              {expriance.map((experience, index) => (
                <ExperienceCard
                  key={index}
                  {...experience}
                  onEdit={() => handleEdit(index)}
                  onDelete={() => handleRemoveExperience(index)}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                setExpriance([]);
                setCurrentExperience({
                  position: "",
                  name: "",
                  company: "",
                  experienceLetter: "",
                  location: "",
                  startDate: "",
                  endDate: "",
                  url: "",
                  summary: "",
                  highlights: [],
                });
              }}
            >
              Clear
            </button>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experiances;

