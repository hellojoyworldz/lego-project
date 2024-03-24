import { useState, useEffect } from 'react'
import WeatherBox from './component/WeatherBox'
import WeatherButton from './component/WeatherButton'
import { ClipLoader } from 'react-spinners'
import './App.css'

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
  const [city, setCity] = useState("")
  
  const getCurrentLocation = () => {
    setLoading(true)
    setCity("")
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      getWeatherByCurrentLocation(lat, lon)
    })
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
