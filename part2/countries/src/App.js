import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Results from './components/Results';
import './App.css';

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  const onFilterChange = (e) => {
    setFilter(e.target.value)
    const filtered = countries.filter(country => country.name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredCountries(filtered)
  }

  const countriesToShow = filteredCountries ? filteredCountries : []

  return (
    <div>
      <div>find countries <input value={filter} onChange={onFilterChange} /></div>
      <Results countries={countriesToShow}/>
    </div>
  );
}

export default App;
