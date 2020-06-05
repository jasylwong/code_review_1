import React from 'react';
import Country from './Country';

const Results = ({ countries }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length > 1) {
    return (
      countries.map((country, i) => {
        return <div key={i}>{country.name}</div>
      })
    )
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />
  } else {
    return <div>Search for a country</div>
  }
}

export default Results;