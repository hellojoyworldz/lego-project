import React from 'react'

const WeatherBox = ({weather, flag}) => {

  let c = Math.floor(weather?.main.temp)
  let f = Math.floor(9/5*(weather?.main.temp)+32)
  let icon = <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} width="100" height="100" alt="" />

  return (
    <div className="info">
      <h1 className="info-tit">
        <span className="info-tit-city">{weather?.name}{flag[weather?.sys.country]}</span>
        <span className="info-tit-country">{weather?.sys.country}</span>
      </h1>
      
      <div className="info-summary">
        <strong className="info-summary-temp">{weather && c}<sup>°C</sup></strong>
        <div className="info-summary-icon">{weather && icon} </div>
      </div>

      <ul className="info-list">
        <li>{weather?.weather[0].main}</li>
        <li>{weather && f}°F</li>
        <li>Humidity: {weather?.main.humidity}%</li>
        <li>Cloudiness: {weather?.clouds.all}%</li>
      </ul>
      
    </div>
  )
}

export default WeatherBox
