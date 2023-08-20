import React from "react";

const AssemblyItem = ({
  data,
  item_id,
  stages,
  assemblyItems,
  setAssemblyItems,
}) => {
  const prependItem = (displacedItem, assemblyItemsCopy) => {
    if (displacedItem["stage_index"] === stages.length - 1) {
      const filter = assemblyItemsCopy.filter(
        (item) => item["stage_index"] <= 3
      );
      setAssemblyItems(filter);
      return;
    }

    displacedItem["stage_index"]++;

    assemblyItemsCopy.splice(0, 0, displacedItem);
    setAssemblyItems(assemblyItemsCopy);
  };

  const appendItem = (displacedItem, assemblyItemsCopy) => {
    if (displacedItem["stage_index"] === 0) {
      const filter = assemblyItemsCopy.filter(
        (item) => item["stage_index"] >= 0
      );
      setAssemblyItems(filter);
      return;
    }

    displacedItem["stage_index"]--;

    assemblyItemsCopy.splice(assemblyItemsCopy.length, 0, displacedItem);
    setAssemblyItems(assemblyItemsCopy);
  };

  const mouseHandleClick = (e) => {
    e.preventDefault();

    if (item_id >= 0 && item_id < assemblyItems.length) {
      const assemblyItemsCopy = [...assemblyItems];
      const [displacedItem] = assemblyItemsCopy.splice(item_id, 1);

      if (e.button === 0) {
        prependItem(displacedItem, assemblyItemsCopy);
      } else if (e.button === 2) {
        appendItem(displacedItem, assemblyItemsCopy);
      }
    }
  };

  return (
    <button
      className="assembly-item"
      onContextMenu={mouseHandleClick}
      onClick={mouseHandleClick}
    >
      {data.assembly_item}
    </button>
  );
};

export default React.memo(AssemblyItem);
