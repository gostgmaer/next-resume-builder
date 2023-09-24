import { useGlobalAppContext } from "@/context/context";
import Loader from "@/utils/Loader";
import { getSingleRecord, post } from "@/utils/http";
import React, { useEffect, useState } from "react";

const BasicInfo = ({ id, setId }) => {
  const {
    fetchResumedata,
    currentData,
    updateResumeRecord,
    activeTab,
    setActiveTab,
    loader,
    loaderFalse,
    loaderTrue,
  } = useGlobalAppContext();

  const [formData, setFormData] = useState({
    name: "",
    position: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    website: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your logic to save the form data here
    console.log(formData);
    try {
      const data = await post("/resume.json", formData); // Replace with your collection name
      setId(data.name);
      setActiveTab("work experience");
    } catch (error) {
      console.error("Error getting data:", error);
    }
  };

  const fetchResumeData = async () => {
    const res = await fetchResumedata(id);
    console.log(res);
    setFormData(res);
    if (currentData) {
      console.log(currentData);
      console.log(formData);
    }
  };

  useEffect(() => {
    if (id) {
      fetchResumeData();
    }
  }, [id]);

  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Basic Information</h2>
        <div className="mb-4">
          <div className="title mb-6  w-full"></div>
          <div className="mb-6 flex items-center gap-10">
            <div className=" w-full ">
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
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className=" w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="position"
              >
                Position
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Position"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="contact flex item-center gap-10">
            <div className="mb-6 w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-6 w-full ">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="tel"
                placeholder="Phone"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="social-media flex item center gap-10">
            <div className="mb-6 w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="linkedin"
              >
                LinkedIn URL
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="LinkedIn URL"
                id="linkedin"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6 w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="github"
              >
                GitHub Link
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="GitHub Link"
                id="github"
                name="github"
                value={formData.github}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6 w-full">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="website"
              >
                Website Link
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Website Link"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() =>
              setFormData({
                name: "",
                position: "",
                email: "",
                phone: "",
                linkedin: "",
                github: "",
                website: "",
              })
            }
          >
            Clear
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default BasicInfo;

const BaiscInfoBlock = ({resumeData}) => {
  return (
    <section className="bg-white p-4 shadow-lg rounded-lg my-4">
      <h1 className="text-3xl font-bold mb-2">{resumeData.basics.name}</h1>
      <p className="text-xl text-indigo-600 mb-4">{resumeData.basics.label}</p>
      <p className="mb-2">{resumeData.basics.email}</p>
      <p className="mb-2">{resumeData.basics.phone}</p>
      <p className="mb-2">
        Website:{" "}
        <a
          href={resumeData.basics.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:underline"
        >
          {resumeData.basics.url}
        </a>
      </p>
      <p className="mb-2">
        Location: {resumeData.basics.location.city},{" "}
        {resumeData.basics.location.region},{" "}
        {resumeData.basics.location.countryCode}
      </p>
    </section>
  );
};
