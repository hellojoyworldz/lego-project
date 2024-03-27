import React from 'react'

const Box = (props) => {

  let result;
  if( props.title === "Computer" && props.result !== "Tie" && props.result !== "") result = props.result === "Win" ? "Lose" : "Win"
  else if(props.result === "") result = "Ready"
  else result = props.result

  let defaultImg = "https://www.supercoloring.com/sites/default/files/styles/coloring_medium/public/cif/2022/01/1471-red-question-mark-emoji-coloring-page.png"

  return (
    <div className={`select-box select-box${result}`}>
      <div className="select-thumb">
        <div class="select-thumbBox">
          <img 
              className="select-thumbImg" 
              src={(props.item && props.item.img) || defaultImg}
              alt={props.result}
          />
        </div>
      </div>
      <span className="select-tit">{props.title}</span>
      <strong className="select-result">{result}</strong>
    </div>
  )
}

export default Box