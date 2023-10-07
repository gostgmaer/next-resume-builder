import { useGlobalAppContext } from "@/context/context";
import { findIndex } from "@/utils/custom";
import React, { useEffect, useState } from "react";

const Projects = () => {
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
    name: "",
    startDate: "",
    endDate: "",
    highlights: "",
    url: "",
    description: "",
    repository: "",
    overview: "",
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
      name: "",
      startDate: "",
      endDate: "",
      highlights: "",
      url: "",
      description: "",
      repository: "",
      overview: "",
    });
  };

  const handleRemove = (index) => {
    const updatedExperiences = [...projects];
    updatedExperiences.splice(index, 1);
    setProjects(updatedExperiences);
  };
  const fetchResumeData = async () => {
    const res = await fetchResumedata(id);
    if (res.result?.projects) {
      setProjects(res.result.projects);
    }
    if (currentData) {
      // console.log(currentData);
      // console.log(formData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    var body = {
      last_step: activeTab,
      projects: projects,
    };
    updateResumeRecord("others", body, id);
  };

  const [editIndex, setEditIndex] = useState(-1);

  const handleEdit = (index) => {
    setEditIndex(index);
    const editdata = findIndex(projects, index);
    setFormData(editdata);
  };
  const handleSaveEdit = () => {
    if (editIndex !== -1) {
      const updatedData = [...projects];
      updatedData[editIndex] = formData;
      setProjects(updatedData);
      setEditIndex(-1);
      setFormData({
        name: "",
        startDate: "",
        endDate: "",
        highlights: "",
        url: "",
        description: "",
        repository: "",
        overview: "",
      });
    }
  };

  useEffect(() => {
    if (id) {
      fetchResumeData();
    }
  }, [id]);
  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <div className="mb-6 border-b-2 pb-4">
        <div className="mb-4">
          <div className="w-full max-w-screen-xl mx-auto">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-gray-600"
                      htmlFor="name"
                    >
                      Project Title
                    </label>
                    <input
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
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
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-gray-600"
                      htmlFor="url"
                    >
                      Deployed URL
                    </label>
                    <input
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                      type="text"
                      id="url"
                      name="url"
                      value={formData.url}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-gray-600"
                      htmlFor="repository"
                    >
                      Repository URL
                    </label>
                    <input
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                      type="text"
                      id="repository"
                      name="repository"
                      value={formData.repository}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
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
              </div>
              <div className="mb-6">
                {editIndex === -1 ? (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleAdd}
                  >
                    Add Project
                  </button>
                ) : (
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleSaveEdit}
                  >
                    Update Project
                  </button>
                )}
              </div>
            </form>
            <div className="flex flex-wrap">
              {projects.map((project, index) => (
                <ProjectCard
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
              setProjects([]);
              setFormData({
                name: "",
                startDate: "",
                endDate: "",
                highlights: "",
                url: "",
                description: "",
                repository: "",
                overview: "",
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

export default Projects;

const ProjectCard = ({
  name,
  startDate,
  endDate,
  highlights,
  url,
  description,
  repository,
  overview,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-4 p-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{name}</h2>
 
        <p className="text-gray-600">{overview}</p>
        <p className="text-gray-600">
          Deployed URL: <a href={url}>{url}</a>
        </p>
        <p className="text-gray-600">
          Repository URL: <a href={repository}>{repository}</a>
        </p>
        <p className="text-gray-600">{description}</p>
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
