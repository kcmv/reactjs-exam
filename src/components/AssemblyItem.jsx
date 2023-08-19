import React from "react";

const AssemblyItem = ({ item }) => {
  return <button className="assembly-item">{item}</button>;
};

export default React.memo(AssemblyItem);
