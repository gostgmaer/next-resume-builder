import { useGlobalAppContext } from "@/context/context";
import { findIndex } from "@/utils/custom";
import React, { useEffect, useState } from "react";

const Educations = () => {
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
    institution: "",
    url: "",
    area: "",
    studyType: "",
    startDate: "",
    endDate: "",
    score: "",
    courses: "",
  });
  const [education, setEducation] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    setEducation([...education, formData]);
    setFormData({
      institution: "",
      url: "",
      area: "",
      studyType: "",
      startDate: "",
      endDate: "",
      score: "",
      courses: "",
    });
    // console.log(education);
  };

  const fetchResumeData = async () => {
    const res = await fetchResumedata(id);

    if (res.result?.education) {
      setEducation(res.result?.education);
    }
    if (currentData) {
      // console.log(currentData);
      // console.log(formData);
    }
  };

  const handleRemove = (index) => {
    const updatedExperiences = [...education];
    updatedExperiences.splice(index, 1);
    setEducation(updatedExperiences);
  };

  const [editIndex, setEditIndex] = useState(-1);

  const handleEdit = (index) => {
    setEditIndex(index);
    const editdata = findIndex(education, index);
    setFormData(editdata);
  };
  const handleSaveEdit = () => {
    if (editIndex !== -1) {
      const updatedData = [...education];
      updatedData[editIndex] = formData;
      setEducation(updatedData);
      setEditIndex(-1);
      setFormData({
        institution: "",
        url: "",
        area: "",
        studyType: "",
        startDate: "",
        endDate: "",
        score: "",
        courses: "",
      });
    }
  };

  useEffect(() => {
    if (id) {
      fetchResumeData();
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const eduBody = {
      last_step: activeTab,
      education: education,
    };
    // var body = {
    //   ...mydata,...extra,
    //   education: education,
    // };
    updateResumeRecord("skills", eduBody, id);
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Qualifications</h2>
      <div className="mb-6 border-b-2 pb-4">
        <div className="mb-4">
          <div className=" w-full max-w-screen-xl mx-auto">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block mb-2 text-gray-600" htmlFor="courses">
                    Course
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    type="text"
                    id="courses"
                    name="courses"
                    value={formData.courses}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-gray-600"
                    htmlFor="institution"
                  >
                    College/School Name
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    type="text"
                    id="institution"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label
                    className="block mb-2 text-gray-600"
                    htmlFor="startDate"
                  >
                    Start Date
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-gray-600" htmlFor="endDate">
                    End Date
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    type="date"
                    placeholder="End data"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block mb-2 text-gray-600" htmlFor="score">
                    Percentage
                  </label>
                  <input
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    type="number"
                    id="score"
                    placeholder="80"
                    name="score"
                    value={formData.score}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-6">
                  {editIndex === -1 ? (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={handleAdd}
                    >
                      Add School/College
                    </button>
                  ) : (
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={handleSaveEdit}
                    >
                      Update School/College
                    </button>
                  )}
                </div>
              </div>
            </form>
            <div className="flex flex-wrap">
              {education.map((experience, index) => (
                <EducationCard
                  key={index}
                  {...experience}
                  onEdit={() => handleEdit(index)}
                  onDelete={() => handleRemove(index)}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                setEducation([]);
                setFormData({
                  institution: "",
                  url: "",
                  area: "",
                  studyType: "",
                  startDate: "",
                  endDate: "",
                  score: "",
                  courses: "",
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

export default Educations;

const EducationCard = ({
  institution,
  url,
  area,
  studyType,
  startDate,
  endDate,
  score,
  courses,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-4 p-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{courses}</h2>
       
        <p className="text-gray-600">{institution}</p>
        <p className="text-gray-600">
          {startDate} - {endDate}
        </p>
        <p className="text-gray-600">Percentage: {score}</p>
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
