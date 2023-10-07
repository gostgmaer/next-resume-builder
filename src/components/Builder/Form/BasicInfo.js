import { useAuthContext } from "@/context/authContext";
import { useGlobalAppContext } from "@/context/context";
import Loader from "@/utils/Loader";
import React, { useEffect, useState } from "react";
import firebase from "firebase/database";
import ImageUpload from "./comp/ImageUpload";
import { socialMediaData } from "@/assets/data";
import { patch, put,post } from "@/lib/http";
import { findIndex } from "@/utils/custom";

const BasicInfo = () => {
  // @ts-ignore
  const { user } = useAuthContext();
  const {
    fetchResumedata,
    currentData,
    updateResumeRecord,
    activeTab,
    setActiveTab,
    loader,
    loaderFalse,
    loaderTrue,
    resume,
    setResume,
    id,
    setId,
  } = useGlobalAppContext();

  const [formData, setFormData] = useState({
    name: "",
    position: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    url: "",
    summary: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [network, setNetwork] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const extra = {
      image: imagePreview,
      last_step: activeTab,
      profiles: network,
    };

    const basic = { ...extra, ...formData };
    try {
      const data = await post("/resume", basic); // Replace with your collection name
      setId(data.name);
      setActiveTab("work experience");
    } catch (error) {
      console.error("Error getting data:", error);
    }
  };

  const fetchResumeData = async () => {
    const res = await fetchResumedata(id);
    setFormData(res);
    setImagePreview(res.image);
  };

  const updateResume = (e) => {
    e.preventDefault();
    const extra = {
      image: imagePreview,
      profiles: network,
    };
    var body = {
      ...formData,
      ...extra,
    };
    updateResumeRecord("work experience", body, id);
  };

  useEffect(() => {
    if (id) {
      fetchResumeData();
    }
  }, [id]);

  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
              <ImageUpload
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
              />
            </div>
          </div>
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
              <label className="block mb-2 text-gray-600" htmlFor="overview">
                OverView
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none h-40 focus:ring focus:ring-blue-200"
                id="overview"
                name="overview"
                value={formData.summary}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <div className="social-media flex item center gap-10">
            <SocialProfiles network={network} setNetwork={setNetwork} />
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
                url: "",
                summary: "",
              })
            }
          >
            Clear
          </button>
          {id ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={updateResume}
            >
              Update
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSubmit}
            >
              Save
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BasicInfo;

const BaiscInfoBlock = ({ resumeData }) => {
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

const SocialProfiles = ({ network, setNetwork }) => {
  const { fetchResumedata, currentData, activeTab, setActiveTab, id } =
    useGlobalAppContext();

  const [formData, setFormData] = useState({
    network: "",
    username: "",
    url: "",
  });
  const [mydata, setMydata] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    setNetwork([...network, formData]);
    setFormData({
      network: "",
      username: "",
      url: "",
    });
  };

  const handleRemove = (index) => {
    const updateNetwork = [...network];
    updateNetwork.splice(index, 1);
    setNetwork(updateNetwork);
  };

  const fetchResumeData = async () => {
    const res = await fetchResumedata(id);
    setMydata(res);
    if (res?.profiles) {
      setNetwork(res.profiles);
    }
    if (currentData) {
      // console.log(currentData);
      // console.log(formData);
    }
  };

  const updateRecord = async () => {
    try {
      // Replace '/yourCollectionName/${recordId}.json' with your desired API endpoint

      const extra = {
        updated_time: new Date(),
        last_step: activeTab,
      };
      var data = {
        profiles: network,
      };
      const response = await patch(`/resume`, data, id);
      setActiveTab("projects");
      console.log("Record updated successfully:", response);
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchResumeData();
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRecord();
  };

  const [editIndex, setEditIndex] = useState(-1);

  const handleEdit = (index) => {
    setEditIndex(index);
    const editdata = findIndex(network, index);
    setFormData(editdata);
  };
  const handleSaveEdit = () => {
    if (editIndex !== -1) {
      const updatedData = [...network];
      updatedData[editIndex] = formData;
      setNetwork(updatedData);
      setEditIndex(-1);
      setFormData({
        network: "",
        username: "",
        url: "",
      });
    }
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Social media</h2>
      <div className="mb-6 border-b-2 pb-4">
        <div className="mb-4">
          <div className="w-full max-w-screen-xl mx-auto">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <div className="mb-6 flex  items-center gap-10">
                  <div className="w-full ">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="network"
                    >
                      Social media Name
                    </label>
                    <select
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="network"
                      name="network"
                      value={formData.network}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Select a Social Media Type
                      </option>
                      {socialMediaData.map((option) => (
                        <option key={option.value} value={option.name}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full ">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="url"
                    >
                      Profile Url
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder=" url"
                      id="url"
                      name="url"
                      value={formData.url}
                      onChange={handleChange}
                    />
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
                    Add
                  </button>
                ) : (
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleSaveEdit}
                  >
                    Update
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-wrap justify-between gap-2">
              {network.map((experience, index) => (
                <NetwordInfo
                  key={index}
                  {...experience}
                  onEdit={() => handleEdit(index)}
                  onDelete={() => handleRemove(index)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between"></div>
      </div>
    </div>
  );
};

const NetwordInfo = ({
  network,
  username,
  url,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white w-1/5 shadow-lg rounded-lg overflow-hidden p-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold"><a href={url}>{network}</a></h2>
       
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
