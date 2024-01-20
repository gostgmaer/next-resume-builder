import React, { useState } from 'react';

const RepeatableBlock = () => {
  const [blocks, setBlocks] = useState([]);

  const addBlock = () => {
    setBlocks([...blocks, 'New Block']);
  };

  const removeBlock = (index) => {
    const updatedBlocks = [...blocks];
    updatedBlocks.splice(index, 1);
    setBlocks(updatedBlocks);
  };

  return (
    <div>
    
      <button onClick={addBlock}>Add Block</button>
      {blocks.map((block, index) => (
        <div key={index}>
          <span>{block}</span>
          <button onClick={() => removeBlock(index)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default RepeatableBlock;
