import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
import Countrydata from './components/Countrydata';

const App = () => {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {

    console.log('fetching countries...')
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data)
      })
}, [])

  const handleChange = (event) => {
    setCountry(event.target.value);

  };

  return (
    <div>

      <form>
        find countries: <input value={country} onChange={handleChange} />
      </form>

        <Countrydata
          setCountries={setCountries}
          country={country}
          countries={countries}
        />

    </div>
  )
}

export default App;
