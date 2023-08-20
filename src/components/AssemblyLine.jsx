import React from "react";

class AssemblyLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stages: props.stages.map(() => []),
      itemName: ""
    };
  }

  handleInputChange = (event) => {
    this.setState({
      itemName: event.target.value
    });
  };

  handleInputKeyPress = (event) => {
    if (event.key === "Enter" && this.state.itemName.trim() !== "") {
      this.addItemToStage(0, this.state.itemName);
      this.setState({
        itemName: ""
      });
    }
  };

  addItemToStage = (stageIndex, item) => {
    const stagesCopy = [...this.state.stages];
    stagesCopy[stageIndex].unshift(item);
    this.setState({
      stages: stagesCopy
    });
  };

  moveItem = (stageIndex, itemIndex, direction) => {
    console.log(stageIndex, itemIndex);
    const stagesCopy = [...this.state.stages];

    if (direction === "forward" && stageIndex < stagesCopy.length - 1) {
      this.addItemToStage(stageIndex + 1, stagesCopy[stageIndex][itemIndex]);
    } else if (direction === "backward" && stageIndex > 0) {
      this.addItemToStage(stageIndex - 1, stagesCopy[stageIndex][itemIndex]);
    }

    stagesCopy[stageIndex].splice(itemIndex, 1);

    this.setState({
      stages: stagesCopy
    });
  }
  
  render() {
    if (!this.props.stages || this.props.stages.length === 0) {
      return <div>No stages provided.</div>;
    }

    return (
      <div className="assembly-line">
        Add an item:
        <input
          className="assembly-add-item"
          type="text"
          value={this.state.itemName}
          onChange={this.handleInputChange}
          onKeyDown={this.handleInputKeyPress}
        />
        <hr />
        <div className="container">
          {this.props.stages.map((stage, stageIndex) => (
            <div className="assembly-stage" key={stageIndex}>
              <h3>{stage}</h3>
              {this.state.stages[stageIndex].map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  className="assembly-item"
                  onClick={() => this.moveItem(stageIndex, itemIndex, "forward")}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    this.moveItem(stageIndex, itemIndex, "backward");
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default AssemblyLine;