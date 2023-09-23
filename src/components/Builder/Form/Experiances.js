import React, { useState } from "react";

const Experiances = () => {
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    company: "",
    experienceLetter: "",
    location: "",
    startDate: "",
    endDate: "",
  });

  const [workExperiences, setWorkExperiences] = useState([

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
  const [isOpen, setIsOpen] = useState(true); // State to track the open/closed state

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
    console.log(workExperiences);
  };

  const handleRemoveExperience = (index) => {
    const updatedExperiences = [...workExperiences];
    updatedExperiences.splice(index, 1);
    setWorkExperiences(updatedExperiences);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to save the form data here
    console.log(workExperiences);
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
        {workExperiences.map((experience, index) => (
          <div key={index} className="mb-6 border-b-2 pb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold mb-2">
                Work Experience {index + 1}
              </h3>{" "}
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => handleRemoveExperience(index)}
              >
                Remove
              </button>
            </div>
            <div className="mb-4">
              <div className="w-full max-w-screen-xl mx-auto">
                <form
                  className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                  onSubmit={handleSubmit}
                >
                  <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="title"
                    >
                      Title
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Title"
                      id="title"
                      name="title"
                      value={currentExperience.title}
                      onChange={handleChange}
                    />
                  </div>
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
                </form>
              </div>
            </div>
          </div>
        ))}
        <div className="mb-6">
          {/* <h3 className="text-lg font-bold mb-2">Add Work Experience</h3> */}
          <div className="mb-6">
            {/* Input fields for the currentExperience */}
          </div>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleAddExperience}
          >
            Add Experience
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
              setWorkExperiences([
                
              ]);
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
        </div>
      </form>
    </div>
  );
};

export default Experiances;
