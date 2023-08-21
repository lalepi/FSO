import React from 'react'
import ShowCountry from './Showcountry';

const Countrydata = ({country, setCountries, countries}) => {

    let filter =[]
    
      country.length > 0 
      ? filter = countries.filter((countries) => 
        countries.name.common.toLowerCase().includes(country.toLowerCase()))
    
      : filter = countries
    
      if (country !== '' && filter.length > 10) {return (' Too many matches, specify another filter')}
    
      if (filter.length === 1) {
        return (
          <div>
        <ShowCountry key={filter[0].name.common} country={filter[0]} /> 
        </div>
      )
        }
    
      if (filter.length < 10 && filter.length > 1) {
    
        return filter.map((country) => (
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => setCountries([country])}>show</button>
          </div>
        ))
      } 
    
    }

    export default Countrydata