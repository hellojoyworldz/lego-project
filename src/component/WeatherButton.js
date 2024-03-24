import React from 'react'

const WeatherButton = ({cities, getCurrentLocation, setCity}) => {
  return (
    <div className="city">
      <button type="button" className="city-button active" onClick={getCurrentLocation}>Current Location</button>
      {
        cities.map((item,idx) => {
          return <button type="button" className="city-button" onClick={() => setCity(item)}>{item}</button>
        })
      }
    </div>
  )
}

export default WeatherButton
