import React, { useState, useRef } from "react";
import AssemblyItem from "./AssemblyItem";

const AssemblyLine = ({ stages }) => {
  const [inputItem, setInputItem] = useState("");
  const [assemblyData, setAssemblyData] = useState([]);
  const inputRef = useRef(null);
  console.log(assemblyData);

  const AddItemChange = (e) => {
    e.preventDefault();
    setInputItem(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      setAssemblyData((prevAssemblyData) => [
        ...prevAssemblyData,
        { assembly_item: inputItem, stage_index: 0 },
      ]);
      inputRef.current.value = "";
      console.log(inputItem);
    }
  };

  return (
    <>
      <header>
        <label htmlFor="add-item" className="add-item-label">
          Add an item:
        </label>
        <input
          className="assembly-add-item "
          name="add-item"
          ref={inputRef}
          onChange={AddItemChange}
          onKeyDown={handleInputKeyDown}
        />
      </header>
      <main className="container">
        {stages &&
          stages.map((stage, id) => (
            <div key={stage} className="assembly-stage">
              <h1 className="stage-type">{stage}</h1>
              <div className="stage-items">
                {assemblyData.length !== 0 &&
                  assemblyData.map(
                    ({ assembly_item, stage_index }, data_id = id) => {
                      if (stage_index === id) {
                        return (
                          <div key={`${stage_index}-${data_id}`}>
                            <AssemblyItem item={assembly_item} />
                          </div>
                        );
                      }
                    }
                  )}
              </div>
            </div>
          ))}
      </main>
    </>
  );
};

export default AssemblyLine;

// TODO add your code here.
// Feel free to use hooks and state.
// Don't forget about candidate-written-response.md
// when you finish coding!
