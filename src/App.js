import { useState, useEffect } from 'react'
import WeatherBox from './component/WeatherBox'
import WeatherButton from './component/WeatherButton'
import { ClipLoader } from 'react-spinners'
import './App.css'

const currentPositionErrorDetail = {
  1: "The acquisition of the geolocation information failed because the page didn't have the permission to do it.",
  2: "The acquisition of the geolocation failed because one or several internal sources of position returned an internal error.",
  3: "Geolocation information was not obtained in the allowed time."
}
const cities= ['Paris', 'New york', 'Brisbane', 'Seoul']
const flag = {
  "FR" : '🇫🇷',
  "US" : '🇺🇸',
  "JP" : '🇯🇵',
  "AU" : '🇦🇺',
  "ZA" : '🇳🇿',
  "KR" : '🇰🇷',
}

function App() {

  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null)
  const [currentPositionError, setCurrentPositionError] = useState(null)
  const [city, setCity] = useState("")
  
  const getCurrentLocation = () => {
    setLoading(true)
    setCity("")

    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude
        let lon = position.coords.longitude
        getWeatherByCurrentLocation(lat, lon)
      }, (error) => {
        console.log(error)
        setCurrentPositionError({"message": error.message, "detail": currentPositionErrorDetail[error.code]})
        setLoading(false)
      }, {
        timeout: 10000,
      } 
    )
  }

  const getWeatherByCurrentLocation = async (lat, lon) => {
    setLoading(true)
    try{
      let url =  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a7b59f3fa501b9d5815cd9ea458a97a3&units=metric`
      let response = await fetch(url)
      if(response.status === 200 || response.ok === true){
        let data = await response.json()
        setWeather(data)
      }else if(response.ok === false){
        alert("Refreshes with incorrect response.")
        window.location.reload();
      }
      setLoading(false)
    }catch(e){
      alert("Refreshes with error.")
      window.location.reload();
    } 
  }

  const getWeatherByCity = async () => {
    setLoading(true)
    try{
      let url =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a7b59f3fa501b9d5815cd9ea458a97a3&units=metric`
      let response = await fetch(url)
      if(response.status === 200 || response.ok === true){
        let data = await response.json()
        setWeather(data)
      }else if(response.ok === false){
        alert("Refreshes with incorrect response.")
        window.location.reload();
      }
      setLoading(false)
    }catch(e){
      alert("Refreshes with error.")
      window.location.reload();
    }
  }

  useEffect(() => {
    if(city === "") getCurrentLocation()
    else getWeatherByCity()
  },[city])

  return (
    <div className="weatherWrap">
    {
      loading ? (
          <ClipLoader color="#000" loading={loading} size={150} />
      ) : (

        currentPositionError !== null ? 
          <>
            <h1>{currentPositionError.message}</h1>
            <p>{currentPositionError.detail}</p>
            <a href="/">Refresh</a>
          </>
        :
          <>
            <WeatherBox weather={weather} flag={flag}/>
            <WeatherButton cities={cities} city={city} setCity={setCity} getCurrentLocation={getCurrentLocation}/>
          </>
        )
    }
    </div>
  );
}

export default App;
