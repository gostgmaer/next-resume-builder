import React, { useState } from 'react';

const Skill = ({ skills, setSkills }) => {
  const [newSkill, setNewSkill] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editIndex, setEditIndex] = useState(-1); // Initialize to -1, meaning no skill is being edited

  const addSkill = () => {
    if (newSkill.trim() !== '') {
      setSkills([...skills, { skill: newSkill, description: newDescription }]);
      setNewSkill('');
      setNewDescription('');
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const handleDescriptionChange = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index].description = value;
    setSkills(updatedSkills);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewSkill(skills[index].skill);
    setNewDescription(skills[index].description);
  };

  const handleSaveEdit = () => {
    if (editIndex !== -1) {
      const updatedSkills = [...skills];
      updatedSkills[editIndex].skill = newSkill;
      updatedSkills[editIndex].description = newDescription;
      setSkills(updatedSkills);
      setEditIndex(-1); // Reset the edit state
      setNewSkill('');
      setNewDescription('');
    }
  };

  return (
    <div>
      <div className="flex items-center  text-black space-x-2">
        <input
          type="text"
          className="border rounded-md p-1"
          placeholder="Skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />
        <input
          type="text"
          className="border rounded-md p-1"
          placeholder="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        {editIndex === -1 ? (
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded-md"
            onClick={addSkill}
          >
            Add
          </button>
        ) : (
          <button
            className="bg-green-500 text-white px-2 py-1 rounded-md"
            onClick={handleSaveEdit}
          >
            Save
          </button>
        )}
      </div>
      <ul className="mt-2">
        {skills.map((item, index) => (
          <li key={index} className="py-2">
            <div className="flex justify-between text-black items-center">
              <div>
                {editIndex === index ? (
                  <input
                    type="text"
                    className="border rounded-md p-1"
                    placeholder="Skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                  />
                ) : (
                  <p className="font-semibold">{item.skill}</p>
                )}
                {editIndex === index ? (
                  <input
                    type="text"
                    className="border rounded-md p-1 mt-1"
                    placeholder="Description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                ) : (
                  <p>{item.description}</p>
                )}
              </div>
              {editIndex === index ? (
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded-md"
                  onClick={handleSaveEdit}
                >
                  Save
                </button>
              ) : (
                <>
                  <button
                    className="text-blue-500"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => removeSkill(index)}
                  >
                    Remove
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Skill;
