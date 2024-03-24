import React from 'react'

const WeatherButton = ({cities, setCity}) => {
  return (
    <div>
      <button>Current Location</button>
      {
        cities.map((item,idx) => {
          return <button key={idx} onClick={() => setCity(item)}>{item}</button>
        })
      }
    </div>
  )
}

export default WeatherButton
