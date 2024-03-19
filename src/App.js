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
    if(user.name === computer.name) return ["tie","tie"]
    else if(user.name === "Rock") return computer.name === "Scissors" ?  ["win","lose"] :  ["lose","win"] 
    else if(user.name === "Scissors") return computer.name === "Paper" ?   ["win","lose"]  :  ["lose","win"]
    else if(user.name === "Paper") return computer.name === "Rock" ?  ["win","lose"] :  ["lose","win"]
  }

  const randomChoice = () => {
    // 객체의 키값이 배열로 들어감
    let itemArray = Object.keys(choice) // 객체에 키값만 뽑아서 어레이로 만들어주는 함수다
    let randomItem = Math.floor(Math.random() * itemArray.length) //  소숫점 아래 버린다
    let final = itemArray[randomItem]
    return choice[final]
  }

  return (
    <div>
      <div className="main">
        <Box title="You" item={userSelect} result={result[0]} />
        <Box title="Computer" item={computerSelect} result={result[1]}/>
      </div>
      
      <div className="main">
        <button onClick={() => play("scissors")}>가위</button>
        <button onClick={() => play("rock")}>바위</button>
        <button onClick={() => play("paper")}>보</button>
      </div>
    </div>
    
  );
}

export default App;
