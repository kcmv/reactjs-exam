import React from "react";

const AssemblyItem = ({
  data,
  item_id,
  assemblyItems,
  setAssemblyItems,
  stages,
}) => {
  const prependItem = (removedItem, assemblyItemsCopy) => {
    if (removedItem["stage_index"] === stages.length - 1) {
      const filter = assemblyItemsCopy.filter(
        (item) => item["stage_index"] <= 3
      );
      setAssemblyItems(filter);
      return;
    }

    removedItem["stage_index"]++;

    assemblyItemsCopy.splice(0, 0, removedItem);
    setAssemblyItems(assemblyItemsCopy);
  };

  const appendItem = (removedItem, assemblyItemsCopy) => {
    if (removedItem["stage_index"] === 0) {
      const filter = assemblyItemsCopy.filter(
        (item) => item["stage_index"] >= 0
      );
      setAssemblyItems(filter);
      return;
    }

    removedItem["stage_index"]--;

    assemblyItemsCopy.splice(assemblyItemsCopy.length, 0, removedItem);
    setAssemblyItems(assemblyItemsCopy);
  };

  const mouseHandleClick = (e) => {
    e.preventDefault();

    if (item_id >= 0 && item_id < assemblyItems.length) {
      const assemblyItemsCopy = [...assemblyItems];
      const [removedItem] = assemblyItemsCopy.splice(item_id, 1);

      if (e.button === 0) {
        prependItem(removedItem, assemblyItemsCopy);
      } else if (e.button === 2) {
        appendItem(removedItem, assemblyItemsCopy);
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
