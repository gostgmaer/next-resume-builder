import React, { useState } from "react";

const Languages = () => {
  const [formData, setFormData] = useState({
    language: "",
    fluency: "",
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
  const [Languages, setLanguages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddExperience = () => {
    setLanguages([...Languages, formData]);
    setFormData({
      language: "",
      fluency: "",
      scale: "",
    });
    console.log(Languages);
  };

  const handleRemoveExperience = (index) => {
    const updatedExperiences = [...Languages];
    updatedExperiences.splice(index, 1);
    setLanguages(updatedExperiences);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to save the form data here
    console.log(Languages);
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Languages</h2>
        {Languages.map((experience, index) => (
          <div key={index} className="mb-6 border-b-2 pb-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold mb-2">Language {index + 1}</h3>{" "}
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
                  <div className="mb-4">
                    <div className="mb-6 flex  items-center gap-10">
                      <div className="w-full ">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="language"
                        >
                          Language
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="text"
                          placeholder="English"
                          id="language"
                          name="language"
                          value={formData.language}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="w-full ">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="fluency"
                        >
                          Fluency
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="text"
                          placeholder="Fluency"
                          id="fluency"
                          name="fluency"
                          value={formData.fluency}
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
                          Profeciancy
                        </label>
                        <select
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                          id="scale"
                          name="scale"
                          value={formData.scale}
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
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ))}
        <div className="mb-6">
      
          <div className="mb-6">
            {/* Input fields for the currentExperience */}
          </div>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleAddExperience}
          >
            Add Language
          </button>
        </div>
        <div className="flex items-center justify-between">
        <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              setLanguages([]);
              setFormData({
                language: "",
                fluency: "",
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
export default Languages;
