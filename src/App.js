import { useState, useEffect } from 'react'
import WeatherBox from './component/WeatherBox'
import WeatherButton from './component/WeatherButton'
import './App.css'

function App() {

  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState("")
  const cities= ['Paris', 'New york', 'Osaka', 'Seoul']
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

  const getWeatherByCity = async () => {
    let url =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a7b59f3fa501b9d5815cd9ea458a97a3&units=metric`
    let response = await fetch(url)
    let data = await response.json()
    setWeather(data)
  }

  useEffect(() => {
    if(city === "") getCurrentLocation()
    else getWeatherByCity()
  },[city])

  return (
    <div className="weatherWrap">
      <WeatherBox weather={weather} />
      <WeatherButton cities={cities} setCity={setCity} getCurrentLocation={getCurrentLocation}/>
    </div>
  );
}

export default App;
