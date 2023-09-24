import { useGlobalAppContext } from "@/context/context";
import { findIndex } from "@/utils/custom";
import { put } from "@/utils/http";
import React, { useEffect, useState } from "react";

const Skills = ({id}) => {
  const { fetchResumedata, currentData,updateResumeRecord,activeTab, setActiveTab } = useGlobalAppContext();

  const [formData, setFormData] = useState({
    title: "",
    name: "",
    total_years: "",
    last_used: "",
    scale: "",
  });
  const [mydata, setMydata] = useState(null);




  const [skills, setSkills] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddExperience = () => {
    setSkills([...skills, formData]);
    setFormData({
      title: "",
      name: "",
      total_years: "",
      last_used: "",
      scale: "",
    });
    console.log(skills);
  };

  const handleRemoveExperience = (index) => {
    const updatedExperiences = [...skills];
    updatedExperiences.splice(index, 1);
    setSkills(updatedExperiences);
  };

  
  const fetchResumeData = async () => {
    const res = await fetchResumedata(id);
    setMydata(res);
    if (res?.skill) {
      setSkills(res.skill)
     
    }
    if (currentData) {
      // console.log(currentData);
      // console.log(formData);
    }
  };

  const updateRecord = async () => {
    try {
      // Replace '/yourCollectionName/${recordId}.json' with your desired API endpoint
      console.log(mydata);
      var data = {
      ...mydata,  skill:skills
      }
      const response = await put(`/resume/${id}.json`, data);
      console.log('Record updated successfully:', response);
    } catch (error) {
      console.error('Error updating record:', error);
    }   
  };



  useEffect(() => {
    if (id) {
      fetchResumeData();
    }
  }, [id]);



  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to save the form data here
    console.log(skills);
    updateRecord()
  };

  const [editIndex, setEditIndex] = useState(-1);

  const handleEdit = (index) => {
    setEditIndex(index);
    const editdata = findIndex(skills, index);
    setFormData(editdata);
  };
  const handleSaveEdit = () => {
    if (editIndex !== -1) {
      const updatedData = [...skills];
      updatedData[editIndex] = formData;
      setSkills(updatedData);
      setEditIndex(-1);
      setFormData({
        title: "",
        name: "",
        total_years: "",
        last_used: "",
        scale: "",
      });
    }
  };


  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Skills</h2>
        {skills.map((experience, index) => (
          <div key={index} className="mb-6 border-b-2 pb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold mb-2">Skill {index + 1}</h3>{" "}
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => handleRemoveExperience(index)}
              >
                Remove
              </button>
            </div>
            <div className="mb-4">
             <SkillForm formData={formData} handleChange={handleChange}/>
            </div>
          </div>
        ))}
        <div className="mb-6">
          {/* <h3 className="text-lg font-bold mb-2">Add Skill</h3> */}
          <div className="mb-6">
            {/* Input fields for the currentExperience */}
          </div>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleAddExperience}
          >
            Add Skill
          </button>
        </div>
        <div className="flex items-center justify-between">
         
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              setSkills([]);
              setFormData({
                title: "",
                name: "",
                total_years: "",
                last_used: "",
                scale: "",
              });
            }}
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

export default Skills;


const SkillForm = ({formData,handleChange}) => {
  const currentYear = new Date().getFullYear();

  const last20Years = Array.from(
    { length: 20 },
    (_, index) => currentYear - index
  );
  return  <div className="w-full max-w-screen-xl mx-auto">
  <form
    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
 
  >
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
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="w-full ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="total_years"
          >
            Total Experiance
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Total Experiance"
            id="total_years"
            name="total_years"
            value={formData.total_years}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-6 flex items-center gap-10">
        <div className="w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="last_used"
          >
            Last Used
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            id="last_used"
            name="last_used"
            value={formData.last_used}
            onChange={handleChange}
          >
            <option value="">Select a Year</option>
            {last20Years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="w-1/2 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="scale"
          >
            Expertise
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Expertise"
            id="scale"
            name="scale"
            value={formData.scale}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  </form>
</div>
}



const SkillCard = ({
  title,
  name,
  total_years,
  last_used,
  scale,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-4 p-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-600">{name}</p>
        <p className="text-gray-600">Total Years: {total_years}</p>
        <p className="text-gray-600">Last Used: {last_used}</p>
        <p className="text-gray-600">Scale: {scale}</p>
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
