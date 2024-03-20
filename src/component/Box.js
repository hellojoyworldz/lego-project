import React from 'react'

const Box = (props) => {
  console.log(props)
  return (
    <div className={`select-box ${props.result}`}>
      
      <div className="select-thumb">
        <img 
            className="select-thumbImg" 
            src={props.item && props.item.img}
            alt={props.result}
        />
      </div>
      <span className="select-tit">{props.title}</span>
      <strong className="select-result">{props.result}</strong>
    </div>
  )
}

export default Box