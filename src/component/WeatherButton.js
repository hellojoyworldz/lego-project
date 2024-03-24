import React from 'react'

const WeatherButton = ({cities, getCurrentLocation, city, setCity}) => {
  return (
    <div className="city">
      <button 
        type="button" 
        className={"city-button" + (city ==="" ? " active" : "")} 
        onClick={() => {
          getCurrentLocation()
          setCity("")
        }}
      >
        Current Location
      </button>
      {
        cities.map((item,idx) => {
          return (
            <button 
              type="button" 
              className={"city-button" + (city===item ? " active" : "")} 
              key={idx} 
              onClick={() => setCity(item)}
            >
              {item}
            </button>
          )
        })
      }
    </div>
  )
}

export default WeatherButton
