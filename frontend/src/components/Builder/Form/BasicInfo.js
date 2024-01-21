import { useAuthContext } from "@/context/authContext";
import { useGlobalAppContext } from "@/context/context";
import React, { useEffect, useState } from "react";
import ImageUpload from "./comp/ImageUpload";
import { socialMediaData } from "@/assets/data";
import { patch, post } from "@/lib/http";
import { findIndex } from "@/utils/custom";
import { useFormik } from "formik";
import { baiscValidationSchema } from "@/utils/validationSchema";
import Input from "@/components/global/fields/input";

const BasicInfo = (props) => {

  console.log(props);
  const { user } = useAuthContext();
  const {
    fetchSingleresume,
    updateResumeRecord,
    activeTab,
    setActiveTab,
    id,
    setId,
  } = useGlobalAppContext();

  const [formData, setFormData] = useState({
    name: "",
    position: "",
    email: "",
    phoneNumber: "",
    linkedin: "", website: "", linkedinProfile: "", githubProfile: "",
    github: "",
    url: "",
    summary: "",
  });


  const [imagePreview, setImagePreview] = useState(null);
  const [network, setNetwork] = useState([]);

  const initialValues = {
    name: '',
    position: '',
    email: '', website: "", linkedinProfile: "", githubProfile: "",
    phoneNumber: '',
    url: '',
    summary: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: baiscValidationSchema,
    onSubmit: (values) => {
      // Handle form submission
      handleSubmit()
    },
  });



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
      const data = await post(`/resumes`, basic); // Replace with your collection name
      setId(data.result.insertedId);
      setActiveTab("work experience");
    } catch (error) {
      console.error("Error getting data:", error);
    }
  };


  const updateResume = (e) => {
    e.preventDefault();
    const extra = {
      image: imagePreview,
      profiles: network,
    };
    const { name, position, email, phoneNumber, linkedin, github, url, summary } =
      formData;
    var body = {
      ...extra,
      name,
      position,
      email,
      phoneNumber,
      linkedin,
      github,
      url,
      summary,
    };
    updateResumeRecord("work experience", body, id);
  };



  useEffect(() => {
    if (props.data) {
      setFormData(props.data.result);
      setImagePreview(props.data.result.image);
      setNetwork(props.data.result.profiles);
      console.log(props.data);
    }
  }, []);

  return (
    <div className="w-full  mx-auto">
      <form className="mx-auto mt-5 p-5  grid rounded-lg">
        <div className="col-span-full">
          <h2 className="text-2xl font-bold mb-4">Basic Information</h2>
        </div>

        <div className="mb-4 col-span-full">
          <div className="mb-6 flex items-center gap-10 col-span-full">
            <ImageUpload
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
            />
          </div>
        </div>
        <div className=" mt-8 grid  gap-3 sm:grid-cols-2 col-span-full">

          <div className=" ">
            <Input label={"Name"} type={"text"} additionalAttrs={{ value: formData.name, onChange: handleChange, placeholder: "John" }} classes={undefined} icon={undefined} id={'name'} />
          </div>
          <div className=" ">
            <Input label={"Position"} type={"text"} additionalAttrs={{ value: formData.position, onChange: handleChange, placeholder: "UI developer" }} classes={undefined} icon={undefined} id={'position'} />
          </div>
          <div className=" ">
            <Input label={"email"} type={"email"} additionalAttrs={{ value: formData.email, onChange: handleChange, placeholder: "info@mail.com" }} classes={undefined} icon={undefined} id={'email'} />
          </div>

          <div className=" ">
            <Input label={"Phone Number"} type={"text"} additionalAttrs={{ value: formData.phoneNumber, onChange: handleChange, placeholder: "+9100000000" }} classes={undefined} icon={undefined} id={'phoneNumber'} />
          </div>
          <div className=" ">
            <Input label={"linkedin Profile"} type={"text"} additionalAttrs={{ value: formData.linkedinProfile, onChange: handleChange, placeholder: "john.doi" }} classes={undefined} icon={undefined} id={'linkedinProfile'} />
          </div>
          <div className=" ">
            <Input label={"Github Profile"} type={"text"} additionalAttrs={{ value: formData.githubProfile, onChange: handleChange, placeholder: "john.doi" }} classes={undefined} icon={undefined} id={'githubProfile'} />
          </div>
          <div className=" ">
            <Input label={"Portfolio Url"} type={"text"} additionalAttrs={{ value: formData.website, onChange: handleChange, placeholder: "https:://example.com" }} classes={undefined} icon={undefined} id={'website'} />
          </div>


          <div className="mb-6 col-span-full">
            <label className="block mb-2 text-gray-600" htmlFor="summary">
              Summary
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none h-40 focus:ring focus:ring-blue-200"
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="social-media mb-6 col-span-full">
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
    phoneNumber: "",
    linkedin: "", website: "", linkedinProfile: "", githubProfile: "",
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

const SocialProfiles = ({ network, setNetwork }) => {
  const { fetchResumedata, currentData, activeTab, setActiveTab, id } =
    useGlobalAppContext();

  const [formData, setFormData] = useState({
    network: "",
    username: "",
    url: "",
  });

  const [editIndex, setEditIndex] = useState(-1);


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

  // const fetchResumeData = async () => {
  //   const res = await fetchResumedata(id);
  //   if (res?.profiles) {
  //     setNetwork(res.profiles);
  //   }
  //   if (currentData) {
  //     // console.log(currentData);
  //     // console.log(formData);
  //   }
  // };

  // const updateRecord = async () => {
  //   try {
  //     // Replace '/yourCollectionName/${recordId}.json' with your desired API endpoint

  //     const extra = {
  //       updated_time: new Date(),
  //       last_step: activeTab,
  //     };
  //     var data = {
  //       profiles: network,
  //     };
  //     const response = await patch(`/resume`, data, id);
  //     setActiveTab("projects");
  //     console.log("Record updated successfully:", response);
  //   } catch (error) {
  //     console.error("Error updating record:", error);
  //   }
  // };




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
    <div className="">
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
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
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

const NetwordInfo = ({ network, username, url, onEdit, onDelete }) => {
  return (
    <div className="bg-white w-1/5 shadow-lg rounded-lg overflow-hidden p-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          <a href={url}>{network}</a>
        </h2>
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
