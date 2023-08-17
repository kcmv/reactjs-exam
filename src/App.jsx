import React from "react";
import ReactDOM from "react-dom";
import AssemblyLine from "./components/AssemblyLine";

/* Changes made to this file will not affect your tests.
 * This file is used to control the behavior of the web preview. 
*/
const App = props => (
  <div id="app">
    <AssemblyLine 
      stages={[
        "Brainstorming", 
        "Development", 
        "Testing", 
        "Deployment"
      ]}
    />
  </div>
);

export default App;
