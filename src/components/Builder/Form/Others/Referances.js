import { findIndex } from "@/utils/custom";
import React, { useState } from "react";

const Referances = () => {
  const [formData, setFormData] = useState({
    name: "",
    reference: "",
  });
  const [selectedYear, setSelectedYear] = useState("");

  // Calculate the last 20 years
  const currentYear = new Date().getFullYear();

  const last20Years = Array.from(
    { length: 20 },
    (_, index) => currentYear - index
  );

  // Handle year input changes
  const [references, setReferences] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    setReferences([...references, formData]);
    setFormData({
      name: "",
      reference: "",
    });
    console.log(references);
  };

  const handleRemove = (index) => {
    const updatedExperiences = [...references];
    updatedExperiences.splice(index, 1);
    setReferences(updatedExperiences);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to save the form data here
    console.log(references);
  };

  const [editIndex, setEditIndex] = useState(-1);

  const handleEdit = (index) => {
    setEditIndex(index);
    const editdata = findIndex(references, index);
    setFormData(editdata);
  };
  const handleSaveEdit = () => {
    if (editIndex !== -1) {
      const updatedData = [...references];
      updatedData[editIndex] = formData;
      setReferences(updatedData);
      setEditIndex(-1);
      setFormData({
        name: "",
        reference: "",
      });
    }
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">References</h2>
      <div className="mb-6 border-b-2 pb-4">
        <div className="mb-4">
          <div className="w-full max-w-screen-xl mx-auto">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                      placeholder="John Doe"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-6 flex  items-center gap-10">
                  <div className="w-full ">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="reference"
                    >
                      Reference Text
                    </label>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                      id="reference"
                      name="reference"
                      placeholder="reference"
                      value={formData.reference}
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
                    Add Reference
                  </button>
                ) : (
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleSaveEdit}
                  >
                    Update Reference
                  </button>
                )}
              </div>
            </form>
            <div className="flex flex-wrap">
              {references.map((project, index) => (
                <ReferenceCard
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
            setReferences([]);
            setFormData({
              name: "",
              reference: "",
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

export default Referances;

const ReferenceCard = ({ name, reference, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-4 p-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-600">{reference}</p>
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
