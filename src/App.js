import { useState, useEffect } from 'react'
import WeatherBox from './component/WeatherBox'
// import WeatherButton from './component/WeatherButton'
import './App.css'

function App() {

  const [weather, setWeather] = useState(null)

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      getWeatherByCurrentLocation(lat, lon)
    })
  }

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url =  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a7b59f3fa501b9d5815cd9ea458a97a3&units=metric`
    let response = await fetch(url)
    let data = await response.json()
    setWeather(data)
  }

  useEffect(()=>{
    getCurrentLocation()
  }, [])

  return (
    <div className="weatherWrap">
      <WeatherBox weather={weather} />
      {
        // <WeatherButton />
      }
    </div>
  );
}

export default App;
