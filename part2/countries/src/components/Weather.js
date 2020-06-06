import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ country }) => {
  const [weather, setWeather] = useState()

  useEffect(() => {
    axios.get("http://api.weatherstack.com/current?access_key="+process.env.REACT_APP_WEATHERSTACK_KEY+"&query="+country.capital)
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  return (
    weather ? (
      <div>
        <h3>Weather in {country.capital}</h3>
        <div>temperature: {weather.current.temperature} Celcius</div>
        <img src={weather.current.weather_icons[0]} />
        <div>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
      </div>
    ) : null
  )
}

export default Weather;