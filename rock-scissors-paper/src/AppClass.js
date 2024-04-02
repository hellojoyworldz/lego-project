import React, { Component } from "react";
import BoxClass from "./component/BoxClass";
import ScoreClass from "./component/ScoreClass";

const choice = {
  rock: {
    name: "Rock",
    img: "https://cdn.pixabay.com/photo/2014/03/25/15/26/rock-paper-scissors-296854_1280.png",
  },
  scissors: {
    name: "Scissors",
    img: "https://cdn.pixabay.com/photo/2014/03/25/15/26/rock-paper-scissors-296853_1280.png",
  },
  paper: {
    name: "Paper",
    img: "https://cdn.pixabay.com/photo/2014/03/25/15/26/rock-paper-scissors-296855_1280.png",
  },
};

export default class AppClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSelect: null,
      computerSelect: null,
      result: "",
      userScore: 0,
      computerScore: 0,
      totalScore: 0,
    };
  }

  play = (userChoice) => {
    let computerChoice = this.randomChoice();
    let choiceResult = this.judgement(choice[userChoice], computerChoice);
    this.score(choiceResult);

    this.setState({
      userSelect: choice[userChoice],
      computerSelect: computerChoice,
      result: choiceResult,
      totalScore: this.state.totalScore + 1,
    });
  };

  score = (choiceResult) => {
    if (choiceResult === "Win") {
      this.setState({
        userScore: this.state.userScore + 1,
      });
    } else if (choiceResult === "Lose") {
      this.setState({
        computerScore: this.state.computerScore + 1,
      });
    }
  };

  judgement = (user, computer) => {
    if (user.name === computer.name) return "Tie";
    else if (user.name === "Rock")
      return computer.name === "Scissors" ? "Win" : "Lose";
    else if (user.name === "Scissors")
      return computer.name === "Paper" ? "Win" : "Lose";
    else if (user.name === "Paper")
      return computer.name === "Rock" ? "Win" : "Lose";
  };

  randomChoice = () => {
    let itemArray = Object.keys(choice);
    let randomItem = Math.floor(Math.random() * itemArray.length);
    let final = itemArray[randomItem];
    return choice[final];
  };

  render() {
    return (
      <div className="project">
        <h1 className="tit-lv1">Rock, Scissors, Paper</h1>

        <article className="score">
          <h2 className="tit-lv2">score({this.state.totalScore})</h2>
          <div className="score-wrapper">
            <ScoreClass title="You" score={this.state.userScore} />
            <ScoreClass title="Computer" score={this.state.computerScore} />
          </div>
        </article>

        <section>
          <h2 className="tit-lv2">play</h2>

          <div className="select-wrapper">
            <BoxClass
              title="You"
              item={this.state.userSelect}
              result={this.state.result}
            />
            <BoxClass
              title="Computer"
              item={this.state.computerSelect}
              result={this.state.result}
            />
          </div>

          <div className="play-wrapper">
            <button className="play-btn" onClick={() => this.play("scissors")}>
              ✌🏻<span className="readonly">scissors</span>
            </button>
            <button className="play-btn" onClick={() => this.play("rock")}>
              ✊🏻<span className="readonly">rock</span>
            </button>
            <button className="play-btn" onClick={() => this.play("paper")}>
              🖐🏻<span className="readonly">paper</span>
            </button>
          </div>
        </section>
      </div>
    );
  }
}
