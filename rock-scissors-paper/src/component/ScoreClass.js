import React, { Component } from "react";

export default class ScoreClass extends Component {
  render() {
    return (
      <div className="score-box">
        <span className="score-tit">{this.props.title}</span>
        <strong className="score-point">{this.props.score}</strong>
      </div>
    );
  }
}
