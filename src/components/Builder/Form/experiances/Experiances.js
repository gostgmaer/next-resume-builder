import { useGlobalAppContext } from "@/context/context";
import Loader from "@/utils/Loader";
import { get, getSingleRecord, put } from "@/utils/http";
import React, { useEffect, useState } from "react";
import ExperienceCard from "./Card";
import { findIndex } from "@/utils/custom";

const Experiances = ({ id }) => {
  const {
    fetchResumedata,
    currentData,
    updateResumeRecord,
    activeTab,
    setActiveTab,
    loader,
  } = useGlobalAppContext();

  const [mydata, setMydata] = useState(null);

  const [workExperiences, setWorkExperiences] = useState([
    {
      title: "Software Engineer",
      name: "John Doe",
      company: "ABC Corp",
      experienceLetter: "https://example.com/experience-letter.pdf",
      location: "New York, NY",
      startDate: "January 2020",
      endDate: "Present",
    },
  ]);
  const [currentExperience, setCurrentExperience] = useState({
    title: "",
    name: "",
    company: "",
    experienceLetter: "",
    location: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentExperience({ ...currentExperience, [name]: value });
  };

  const handleAddExperience = () => {
    setWorkExperiences([...workExperiences, currentExperience]);
    setCurrentExperience({
      title: "",
      name: "",
      company: "",
      experienceLetter: "",
      location: "",
      startDate: "",
      endDate: "",
    });
  };

  // const handleEdit = (experience) => {
  //   // Handle edit action here (e.g., open an edit modal)
  //   console.log(`Editing ${experience.title}`);
  // };

  const handleRemoveExperience = (index) => {
    const updatedExperiences = [...workExperiences];
    updatedExperiences.splice(index, 1);
    setWorkExperiences(updatedExperiences);
  };

  const [editIndex, setEditIndex] = useState(-1);

  const handleEdit = (index) => {
    setEditIndex(index);
    const editdata = findIndex(workExperiences, index);
    setCurrentExperience(editdata);
  };
  const handleSaveEdit = () => {
    if (editIndex !== -1) {
      const updatedData = [...workExperiences];
      updatedData[editIndex] = currentExperience;
      setWorkExperiences(updatedData);
      setEditIndex(-1);
      setCurrentExperience({
        title: "",
        name: "",
        company: "",
        experienceLetter: "",
        location: "",
        startDate: "",
        endDate: "",
      });
    }
  };

  const updateRecord = async () => {
    try {
      // Replace '/yourCollectionName/${recordId}.json' with your desired API endpoint
      var expriances = {
        ...mydata,
        experiances: workExperiences,
      };
      const response = await put(`/resume/${id}.json`, expriances);

      return response;
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to save the form data here
    console.log(workExperiences);
    try {
      updateRecord(); // Replace with your collection name
      setActiveTab("education");
    } catch (error) {
      console.error("Error getting data:", error);
    }
  };

  const fetchResumeData = async () => {
    const res = await fetchResumedata(id);
    setMydata(res);
    console.log(res);
    if (res.experiances) {
      setWorkExperiences(res.experiances);
    }
  };

  useEffect(() => {
    if (id) {
      fetchResumeData();
    }
  }, [id]);

  if (loader) {
    <Loader />;
  }

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
                      Name
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
                  htmlFor="title"
                >
                  Descriptions
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Descriptions...."
                  id="title"
                  name="title"
                  value={currentExperience.title}
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
              {workExperiences.map((experience, index) => (
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
                setWorkExperiences([]);
                setCurrentExperience({
                  title: "",
                  name: "",
                  company: "",
                  experienceLetter: "",
                  location: "",
                  startDate: "",
                  endDate: "",
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

export async function getServerSideProps() {
  // Fetch data from an API
  const response = await get("/resume.json");
  const data = await response.json();

  // Pass the data as a prop to the page component
  return {
    props: {
      data,
    },
  };
}
