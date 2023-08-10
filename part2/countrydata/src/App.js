import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'


const CountryNames = ({ countryName}) => (

  <div>
     {console.log("inside countryNames", countryName)}
    {countryName.name.common}
  </div>
)

const Countrydata = ({ filteredItems, allCountries}) => {

if(filteredItems.length > 10){
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

if(filteredItems.length < 10 && filteredItems.length > 1) {

  return (
    <div>
      {filteredItems.map(name =>
        <CountryNames
          key={name.area}
          countryName={name}
        />
      )}
    </div>
  )
}
if(filteredItems.length === 1){


console.log("filteredItems", filteredItems[0].languages)

const languages =  filteredItems.map(language => (
    Object.values(language.languages)
  ))


    return (
      <div>
        {filteredItems[0].name.common}
        {filteredItems[0].capital[0]}
        languages:
        <ul>
  {languages}
        </ul>
        {filteredItems[0].flag}
      </div>
    )
  }
}

const App = () => {
  const [value, setValue] = useState('')
  const [country, setCountry] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [singleCountry, setSingleCountry] = useState({})


  const filteredItems = country === '' ? country :allCountries.filter(item => `${item.name.common.toLowerCase()}`.includes(country.toLowerCase()));

  const onlyOne = filteredItems.length === 1

 

  useEffect(() => {

    console.log('fetching countries...')
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setAllCountries(response.data)
        console.log(response.data)
      })
  
}, [])


useEffect(() => {
if(onlyOne){
  console.log('fetching single country...')
  axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
    .then(response => {
      setSingleCountry(response.data)
      console.log(response.data)

      console.log("data of the country",singleCountry)
    })
  }

},[onlyOne])


  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setCountry(value)
    }
  
  return (
    <div>

      <form onSubmit={onSearch}>
        find countries: <input value={value} onChange={handleChange} />
      </form>

      
      <Countrydata
        filteredItems={filteredItems}
        singleCountry={singleCountry}
      />
      
      
    </div>
  )
}



export default App;
