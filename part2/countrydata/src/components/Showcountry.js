import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'


const ShowCountry = ({country}) => {

    const [api, setApiCall] = useState([])
    const apiKey = process.env.REACT_APP_API_KEY
    useEffect(() => {
    axios
    .get(`http://api.openweathermap.org/data/2.5/weather?&units=metric&q=${country.capital},${country.name.common}&APPID=${apiKey}`)
    .then(response => {
      setApiCall(response.data)
    })
  }, [])
  
    if (api.main === undefined) { return null }
    else return (
  
  
      <div className="body">
        <h1>{country.name.common}</h1>
        <div>{` capital ${country.capital[0]}`}</div>
        <div>{` area ${country.area}`}</div>
        <h2>languages:</h2>
        <ul>{Object.entries(country.languages).map(([key, value]) => <li key={key}>{value}</li>)}</ul>
        <img src={country.flags.png} />
        <h2>Weather in {api.name}</h2>
        <div>{` temperature ${api.main.temp} Celsius`}</div>
        <img src={`https://openweathermap.org/img/wn/${api.weather[0].icon}@2x.png`} />
        <div>{` wind ${api.wind.speed} m/s`}</div>
      </div>
    )
  }

  export default ShowCountry