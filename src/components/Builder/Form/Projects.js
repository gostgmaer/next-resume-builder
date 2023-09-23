import React, { useState } from "react";

const Projects = () => {
  const [formData, setFormData] = useState({
    title: "",
    projectTitle: "",
    overview: "",
    deployedUrl: "",
    repositoryUrl: "",
    description: "",
  });

  const [projects, setProjects] = useState([]);
  // const [projetcs, setWorkExperiences] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    setProjects([...projects, formData]);
    setFormData({
      title: "",
      projectTitle: "",
      overview: "",
      deployedUrl: "",
      repositoryUrl: "",
      description: "",
    });
    console.log(projects);
  };

  const handleRemove = (index) => {
    const updatedExperiences = [...projects];
    updatedExperiences.splice(index, 1);
    setProjects(updatedExperiences);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to save the form data here
    console.log(projects);
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        {projects.map((project, index) => (
          <div key={index} className="mb-6 border-b-2 pb-4">
            <div className="flex justify-between items-center my-5">
              <h3 className="text-lg font-bold mb-2">Project {index + 1}</h3>{" "}
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => handleRemove(index)}
              >
                Remove
              </button>
            </div>
            <div className="mb-4">
              <div className="w-full max-w-screen-xl mx-auto">
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
                        htmlFor="projectTitle"
                      >
                        Project Title
                      </label>
                      <input
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        type="text"
                        id="projectTitle"
                        name="projectTitle"
                        value={formData.projectTitle}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-gray-600"
                        htmlFor="overview"
                      >
                        Overview
                      </label>
                      <input
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        type="text"
                        id="overview"
                        name="overview"
                        value={formData.overview}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-gray-600"
                        htmlFor="deployedUrl"
                      >
                        Deployed URL
                      </label>
                      <input
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        type="text"
                        id="deployedUrl"
                        name="deployedUrl"
                        value={formData.deployedUrl}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-gray-600"
                        htmlFor="repositoryUrl"
                      >
                        Repository URL
                      </label>
                      <input
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        type="text"
                        id="repositoryUrl"
                        name="repositoryUrl"
                        value={formData.repositoryUrl}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-span-2 mb-4">
                      <label
                        className="block mb-2 text-gray-600"
                        htmlFor="description"
                      >
                        Project Description
                      </label>
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ))}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2">Add Project</h3>
          <div className="mb-6">
            {/* Input fields for the currentExperience */}
          </div>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleAdd}
          >
            Add Project
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
              setProjects([
              
              ]);
              setFormData({
                title: "",
                projectTitle: "",
                overview: "",
                deployedUrl: "",
                repositoryUrl: "",
                description: "",
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

export default Projects;
