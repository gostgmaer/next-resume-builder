import React, { useState } from "react";

const Educations = () => {
  const [formData, setFormData] = useState({
    title: "",
    educationTitle: "",
    schoolName: "",
    startDate: "",
    endDate: "",
    percentage: "",
  });
  const [education, setEducation] = useState([
    
  ]);

  // const [projetcs, setWorkExperiences] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    setEducation([...education, formData]);
    setFormData({
      title: "",
      educationTitle: "",
      schoolName: "",
      startDate: "",
      endDate: "",
      percentage: "",
    });
    console.log(education);
  };

  const handleRemove = (index) => {
    const updatedExperiences = [...education];
    updatedExperiences.splice(index, 1);
    setEducation(updatedExperiences);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to save the form data here
    console.log(education);
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Qualifications</h2>
        {education.map((project, index) => (
          <div key={index} className="mb-6 border-b-2 pb-4">
            <div className="flex justify-between items-center my-5">
              <h3 className="text-lg font-bold mb-2">
                Qualification {index + 1}
              </h3>{" "}
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => handleRemove(index)}
              >
                Remove
              </button>
            </div>
            <div className="mb-4">
              <div className=" w-full max-w-screen-xl mx-auto">
                <form
                  onSubmit={handleSubmit}
                  className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    {/* Full-width field */}
                    <div className="col-span-2 mb-4">
                      <label
                        className="block mb-2 text-gray-600"
                        htmlFor="title"
                      >
                        Title
                      </label>
                      <input
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                      />
                    </div>

                    {/* 50% width fields */}
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-gray-600"
                        htmlFor="educationTitle"
                      >
                        Education Title
                      </label>
                      <input
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        type="text"
                        id="educationTitle"
                        name="educationTitle"
                        value={formData.educationTitle}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-gray-600"
                        htmlFor="schoolName"
                      >
                        College/School Name
                      </label>
                      <input
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        type="text"
                        id="schoolName"
                        name="schoolName"
                        value={formData.schoolName}
                        onChange={handleChange}
                      />
                    </div>
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
                      <label
                        className="block mb-2 text-gray-600"
                        htmlFor="endDate"
                      >
                        End Date
                      </label>
                      <input
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-gray-600"
                        htmlFor="percentage"
                      >
                        Percentage
                      </label>
                      <input
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        type="number"
                        id="percentage"
                        name="percentage"
                        value={formData.percentage}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ))}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">Add School/College</h3>
          <div className="mb-6">
            {/* Input fields for the currentExperience */}
          </div>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleAdd}
          >
            Add Qualification
          </button>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              setEducation([]);
              setFormData({
                title: "",
                educationTitle: "",
                schoolName: "",
                startDate: "",
                endDate: "",
                percentage: "",
              });
            }}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default Educations;
