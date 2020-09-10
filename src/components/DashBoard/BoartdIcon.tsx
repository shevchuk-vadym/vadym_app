import React from "react";
import "./BoardIcon.css";

export class BoardIcon extends React.Component<any, any> {
  render() {
    return (
      <div
        className="board"
        style={{
          backgroundColor: this.props.background,
          backgroundImage: this.props.backgroundImage,
        }}
      >
        <h3 className="title">
          {" "}
          <p>{this.props.name}</p>
        </h3>
      </div>
    );
  }
}
