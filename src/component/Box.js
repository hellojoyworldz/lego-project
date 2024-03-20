import React from 'react'

const Box = (props) => {
  let result;
  if( props.title === "computer" && props.result !== "tie" && props.result !== ""){
    result = props.result === "win" ? "lose" : "win"
  }else{
    result = props.result
  }

  return (
    <div className={`select-box ${result}`}>
      <div className="select-thumb">
        <img 
            className="select-thumbImg" 
            src={props.item && props.item.img}
            alt={props.result}
        />
      </div>
      <span className="select-tit">{props.title}</span>
      <strong className="select-result">{result}</strong>
    </div>
  )
}

export default Box