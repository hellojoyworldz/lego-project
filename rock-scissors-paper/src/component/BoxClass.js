import React, { Component } from "react";

export default class BoxClass extends Component {
  constructor() {
    super();
    this.result = "";
    this.defaultImg =
      "https://www.supercoloring.com/sites/default/files/styles/coloring_medium/public/cif/2022/01/1471-red-question-mark-emoji-coloring-page.png";
  }

  getResult = () => {
    if (
      this.props.title === "Computer" &&
      this.props.result !== "Tie" &&
      this.props.result !== ""
    )
      this.result = this.props.result === "Win" ? "Lose" : "Win";
    else if (this.props.result === "") this.result = "Ready";
    else this.result = this.props.result;
  };

  render() {
    this.getResult();
    return (
      <div className={`select-box select-box${this.result}`}>
        <div className="select-thumb">
          <div class="select-thumbBox">
            <img
              className="select-thumbImg"
              src={(this.props.item && this.props.item.img) || this.defaultImg}
              alt={this.result}
            />
          </div>
        </div>
        <span className="select-tit">{this.props.title}</span>
        <strong className="select-result">{this.result}</strong>
      </div>
    );
  }
}
