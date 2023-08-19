import React, { useState } from 'react';

const AssemblyLine = ({ stages }) => {

  // stores an array of arrays, each inner arrays represents items at a specific stage.
  // inputValue = stores the current value of the input field for adding new items.
  const [items, setItems] = useState(Array(stages.length).fill([]));
  const [inputValue, setInputValue] = useState('');

  // Updates the 'inputValue' state as the user types into the input field.
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Triggered when presses the Enter key in the input field. If the input is not empty, it adds the input value to the first stage's item list and clears the input field.
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== ""){
      const newItems = [...items];
      newItems[0] = [inputValue, ...newItems[0]];
      setItems(newItems);
      setInputValue("");
    }
  }

  // Handles moving items forward or backward throough the stages of the assembly line.
  const shiftItem = (itemIndex, direction) => {
    const currentStageIndex = items.findIndex(stageItems => stageItems.includes(itemIndex));
    if (currentStageIndex === -1)
    return;

  const newItems = [...items];

  if (direction === 'forward'){
    if (currentStageIndex === stages.length - 1) {
      // filter method was used to create new array containing elements that meet a specific condition.
      newItems[currentStageIndex] = newItems[currentStageIndex].filter(item => item !== itemIndex);
    } else {
      newItems[currentStageIndex] = newItems[currentStageIndex].filter(item => item !== itemIndex);
      newItems[currentStageIndex + 1] = [itemIndex, ... newItems[currentStageIndex + 1]];
    }
  } else if (direction === 'backward'){
    if(currentStageIndex === 0){
      newItems[currentStageIndex] = newItems[currentStageIndex].filter(item => item !== itemIndex);
    } else {
      newItems[currentStageIndex] = newItems[currentStageIndex].filter(item => item !== itemIndex);
      newItems[currentStageIndex - 1] = [...newItems[currentStageIndex - 1], itemIndex];
    }
  }
  setItems(newItems);
}

return (
  
  <div className="assembly-container">

  <p>Add an item: <input
    className="add-item"
    value={inputValue}
    onChange={handleInputChange}
    onKeyPress={handleKeyPress} /> </p>

  <div className="stages-container">
    {stages.map((stage, stageIndex) => (
      <div key={stageIndex} className="assembly-stage">
      <h3>{stage}</h3>

    {items[stageIndex].map((itemIndex,indexItem) => (
      /*
        If the left mouse button is click which is the "button = 0" it will trigger to move forward.
        If the right mouse button is click which is the "button = 2" it will trigger to move backward.
      */
      <button key={indexItem} className="assembly-item" onMouseDown={(e) => {
        if (e.button === 0){
          shiftItem(itemIndex, 'forward');
        } else if (e.button === 2) {
          shiftItem(itemIndex, 'backward');
        }
      }} >

    {inputValue === itemIndex ? 'Adding...' : itemIndex} </button>
      ))}
      </div>
    ))}

  </div>
  </div>
  );
};

export default AssemblyLine;