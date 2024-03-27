import "./App.css";
import Score from "./component/Score";
import Box from "./component/Box";
import Records from "./component/Records";
import { useState } from "react";

// 박스 2개 (타이틀, 사진정보, 결과)
// 가위, 바위, 보 버튼이 있다
// 버튼을 클릭하면 클릭한 값이 박스에 보임
// 컴퓨터는 랜덤하게 아아템 선택이 된다
// 3,4의 결과를 가지고 누가 이겼는지 승패를 따진다
// 승패결과에 따라 테두리 색이 바뀐다 (지면 빨강, 이기면 초록, 비기면 검정)

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

function App() {
  const [userSelect, setUserSelect] = useState(null);
  const [computerSelect, setComputerSelect] = useState(null);
  const [result, setResult] = useState("");
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const play = (userChoice) => {
    setUserSelect(choice[userChoice]);

    let computerChoice = randomChoice();
    setComputerSelect(computerChoice);

    let choiceResult = judgement(choice[userChoice], computerChoice);
    setResult(choiceResult);
    score(choiceResult);

    setTotalScore(totalScore + 1);
  };

  const score = (choiceResult) => {
    if (choiceResult === "Win") setUserScore(userScore + 1);
    else if (choiceResult === "Lose") setComputerScore(computerScore + 1);
  };

  const judgement = (user, computer) => {
    if (user.name === computer.name) return "Tie";
    else if (user.name === "Rock")
      return computer.name === "Scissors" ? "Win" : "Lose";
    else if (user.name === "Scissors")
      return computer.name === "Paper" ? "Win" : "Lose";
    else if (user.name === "Paper")
      return computer.name === "Rock" ? "Win" : "Lose";
  };

  const randomChoice = () => {
    // 객체의 키값이 배열로 들어감
    let itemArray = Object.keys(choice); // 객체에 키값만 뽑아서 어레이로 만들어주는 함수다
    let randomItem = Math.floor(Math.random() * itemArray.length); //  소숫점 아래 버린다
    let final = itemArray[randomItem];
    return choice[final];
  };

  return (
    <div className="project">
      <h1 className="tit-lv1">Rock, Scissors, Paper</h1>

      <article className="score">
        <h2 className="tit-lv2">score({totalScore})</h2>
        <div class="score-wrapper">
          <Score title="You" score={userScore} />
          <Score title="Computer" score={computerScore} />
        </div>
      </article>

      <section>
        <h2 className="tit-lv2">play</h2>
        <div className="play-wrapper">
          <button className="play-btn" onClick={() => play("scissors")}>
            ✌🏻<span className="readonly">scissors</span>
          </button>
          <button className="play-btn" onClick={() => play("rock")}>
            ✊🏻<span className="readonly">rock</span>
          </button>
          <button className="play-btn" onClick={() => play("paper")}>
            🖐🏻<span className="readonly">paper</span>
          </button>
        </div>

        <div className="select-wrapper">
          <Box title="You" item={userSelect} result={result} />
          <Box title="Computer" item={computerSelect} result={result} />
        </div>
      </section>
      {/*
      <article className="records">
        <h2 className="tit-lv2">records</h2>
        <Records userSelect={userSelect} computerChoice={computerSelect} result={result} />
      </article>
      */}
    </div>
  );
}

export default App;
