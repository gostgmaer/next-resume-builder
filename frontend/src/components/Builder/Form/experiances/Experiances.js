"use client"
import { useGlobalAppContext } from "@/context/context";
import React, { useEffect, useState } from "react";
import ExperienceCard from "./Card";
import { findIndex } from "@/utils/custom";
import { patch } from "@/lib/http";
import Input from "@/components/global/fields/input";

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
      const response = await updateResumeRecord("education", expriances, id);
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
      <h2 className="text-2xl font-bold mb-4 mt-5 p-5">Work Experience</h2>
      <div className="mb-6 border-b-2 pb-4">
      <div className="w-full max-w-screen-xl mx-auto">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mx-auto mt-5 p-5  grid rounded-lg">
                <div className="mt-8 grid  gap-3 sm:grid-cols-2 col-span-full">
                  <div className="w-full ">
                    <Input label={"Position"} type={"text"} additionalAttrs={{ value: currentExperience.name, onChange: { handleChange }, name: "name", placeholder: "John" }} classes={undefined} icon={undefined} id={"name"} />
                  </div>
                  <div className="w-full ">
                    <Input label={"Company"} type={"text"} additionalAttrs={{ value: currentExperience.company, onChange: { handleChange }, name: "company", placeholder: "Kishor" }} classes={undefined} icon={undefined} id={"company"} />
                  </div>
                  <div className="w-full ">
                    <Input label={"Location"} type={"text"} additionalAttrs={{ value: currentExperience.location, onChange: { handleChange }, name: "location", placeholder: "Kolkata" }} classes={undefined} icon={undefined} id={"location"} />
                  </div>
                  <div className="w-full ">
                    <Input label={"Experience Letter"} type={"text"} additionalAttrs={{ value: currentExperience.experienceLetter, onChange: { handleChange }, name: "experienceLetter", placeholder: "Letter" }} classes={undefined} icon={undefined} id={"experienceLetter"} />
                  </div>
                  <div className="w-full ">
                    <Input label={"Start Date"} type={"date"} additionalAttrs={{ value: currentExperience.startDate, onChange: { handleChange }, name: "startDate", placeholder: "20/11/2011" }} classes={undefined} icon={undefined} id={"startDate"} />
                  </div>
                  <div className="w-full ">
                    <Input label={"End Date"} type={"date"} additionalAttrs={{ value: currentExperience.endDate, onChange: { handleChange }, name: "endDate", placeholder: "20/12/2012" }} classes={undefined} icon={undefined} id={"endDate"} />
                  </div>
                  <div className="col-span-full">
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
                </div>
                <div className="mt-8 grid  gap-3 sm:grid-cols-2 col-span-full">
                  <div className="w-full ">
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

                </div>
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
  );
};

export default Experiances;

