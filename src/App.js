import './App.css';
import Box from "./component/Box"
import {useState} from "react"

// 박스 2개 (타이틀, 사진정보, 결과)
// 가위, 바위, 보 버튼이 있다
// 버튼을 클릭하면 클릭한 값이 박스에 보임
// 컴퓨터는 랜덤하게 아아템 선택이 된다
// 3,4의 결과를 가지고 누가 이겼는지 승패를 따진다
// 승패결과에 따라 테두리 색이 바뀐다 (지면 빨강, 이기면 초록, 비기면 검정)

const choice = {
  rock : {
    name : 'Rock',
    img : "https://cdn.pixabay.com/photo/2014/03/25/15/26/rock-paper-scissors-296854_1280.png"
  },
  scissors: {
    name: 'Scissors',
    img: "https://cdn.pixabay.com/photo/2014/03/25/15/26/rock-paper-scissors-296853_1280.png"
  },
  paper: {
    name: "Paper",
    img : "https://cdn.pixabay.com/photo/2014/03/25/15/26/rock-paper-scissors-296855_1280.png"
  },
}

function App() {

  const [userSelect, setUserSelect] = useState(null)
  const [computerSelect, setComputerSelect] = useState(null)
  const [result, setResult] = useState("")

  const play = (userChoice) => {
    setUserSelect (choice[userChoice])
    let computerChoice = randomChoice()
    setComputerSelect(computerChoice)
    setResult(judgement(choice[userChoice], computerChoice))
  }

  const judgement = (user, computer) => {
    if(user.name === computer.name) return "tie"
    else if(user.name === "Rock") return computer.name === "Scissors" ? "win" : "lose"
    else if(user.name === "Scissors") return computer.name === "Paper" ? "win" : "lose"
    else if(user.name === "Paper") return computer.name === "Rock" ? "win" : "lose"
  }

  const randomChoice = () => {
    // 객체의 키값이 배열로 들어감
    let itemArray = Object.keys(choice) // 객체에 키값만 뽑아서 어레이로 만들어주는 함수다
    let randomItem = Math.floor(Math.random() * itemArray.length) //  소숫점 아래 버린다
    let final = itemArray[randomItem]
    return choice[final]
  }

  return (
    <div className="project">
      <h1 class="tit-lv1">Rock, Scissors, Paper</h1>

      <article className="score">
        <h2 className="tit-lv2">score</h2>
        <div class="score-wrapper">
          <div className="score-box">
            <span className="score-tit">You</span>
            <strong className="score-point">1</strong>
          </div>
          <div className="score-box">
            <span className="score-tit">computer</span>
            <strong className="score-point">2</strong>
          </div>
        </div>
      </article>
  
      <section>
        <h2 className="tit-lv2">play</h2>
        <div className="play-wrapper">
          <button className="play-btn" onClick={() => play("scissors")}>✌🏻<span className="readonly">가위</span></button>
          <button className="play-btn" onClick={() => play("rock")}>✊🏻<span className="readonly">바위</span></button>
          <button className="play-btn" onClick={() => play("paper")}>🖐🏻<span className="readonly">보</span></button>
        </div>

        <div class="select-wrapper">
          <Box title="You" item={userSelect} result={result} />
          <Box title="Computer" item={computerSelect} result={result}/>
        </div>
      </section>

      <article className="records">
        <h2 className="tit-lv2">records</h2>
        <table class="table-recoards">
          <caption class="readonly">records: Your Choice, Computer Choice, Win</caption>
          <colgroup>
            <col width="33%"></col>
            <col width="33%"></col>
            <col width="33%"></col>
          </colgroup>
          <thead>
            <tr>
              <th>Your Choice</th>
              <th>Computer Choice</th>
              <th>Win</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
            </tr>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
      </article>
    </div>

  );
}

export default App;
