import React, { useState } from "react";
import AssemblyItem from "./AssemblyItem";
import PropTypes from "prop-types";

const AssemblyLine = ({ stages }) => {
  const [inputItem, setInputItem] = useState("");
  const [assemblyItems, setAssemblyItems] = useState([]);

  const addItemHandleChange = (e) => {
    e.preventDefault();
    setInputItem(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      setAssemblyItems((prevAssemblyItems) => [
        { assembly_item: inputItem, stage_index: 0 },
        ...prevAssemblyItems,
      ]);
      setInputItem("");
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
          value={inputItem}
          onChange={addItemHandleChange}
          onKeyDown={handleInputKeyDown}
        />
      </header>
      <main className="container">
        {stages.length !== 0 ? (
          stages.map((stage, stage_id) => (
            <div key={stage} className="assembly-stage">
              <h2 className="stage-type">{stage}</h2>

              <div className="stage-items">
                {assemblyItems.length !== 0 &&
                  assemblyItems.map((data, item_id) => {
                    if (data.stage_index === stage_id) {
                      return (
                        <React.Fragment key={`${data.stage_index}-${item_id}`}>
                          <AssemblyItem
                            stages={stages}
                            data={data}
                            item_id={item_id}
                            assemblyItems={assemblyItems}
                            setAssemblyItems={setAssemblyItems}
                          />
                        </React.Fragment>
                      );
                    }
                  })}
              </div>
            </div>
          ))
        ) : (
          <span>"No Stages Found!"</span>
        )}
      </main>
    </>
  );
};

AssemblyLine.propTypes = {
  stages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AssemblyLine;
