import { findIndex } from "@/utils/custom";
import React, { useState } from "react";

const Interest = () => {
  const [formData, setFormData] = useState({
    interest: "",
    scale: "",
  });
  const [selectedYear, setSelectedYear] = useState("");

  // Calculate the last 20 years
  const currentYear = new Date().getFullYear();

  const last20Years = Array.from(
    { length: 20 },
    (_, index) => currentYear - index
  );

  // Handle year input changes
  const [interests, setInterestes] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    setInterestes([...interests, formData]);
    setFormData({
      interest: "",
      scale: "",
    });
    console.log(interests);
  };

  const handleRemove = (index) => {
    const updatedExperiences = [...interests];
    updatedExperiences.splice(index, 1);
    setInterestes(updatedExperiences);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to save the form data here
    console.log(interests);
  };

  const [editIndex, setEditIndex] = useState(-1);

  const handleEdit = (index) => {
    setEditIndex(index);
    const editdata = findIndex(interests, index);
    setFormData(editdata);
  };
  const handleSaveEdit = () => {
    if (editIndex !== -1) {
      const updatedData = [...interests];
      updatedData[editIndex] = formData;
      setInterestes(updatedData);
      setEditIndex(-1);
      setFormData({
        interest: "",
        scale: "",
      });
    }
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto">
  
        <h2 className="text-2xl font-bold mb-4">Interestes</h2>
        <div className="mb-6 border-b-2 pb-4">
          <div className="mb-4">
            <div className="w-full max-w-screen-xl mx-auto">
              <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
               
              >
                <div className="mb-4">
                  <div className="mb-6 flex  items-center gap-10">
                    <div className="w-full ">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="interest"
                      >
                        Interest
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="music"
                        id="interest"
                        name="interest"
                        value={formData.interest}
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
                      Add Interest
                    </button>
                  ) : (
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={handleSaveEdit}
                    >
                      Update Interest
                    </button>
                  )}
                </div>
              </form>
              <div className="flex flex-wrap">
              {interests.map((project, index) => (
                <InterestCard
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
                setInterestes([]);
                setFormData({
                  interest: "",
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
        </div>
      
     
    </div>
  );
};

export default Interest;

const InterestCard = ({ interest, scale, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-4 p-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{interest}</h2>
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
