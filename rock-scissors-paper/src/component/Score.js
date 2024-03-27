import React from 'react'

const Score = (props) => {
  console.log(props)

  return (
    <div className="score-box">
      <span className="score-tit">{props.title}</span>
      <strong className="score-point">{props.score}</strong>
    </div>
  )
}

export default Score
