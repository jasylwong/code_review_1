import React from 'react';

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>languages</h3>
      {
        country.languages.map((language, i) => {
          return <li key={i}>{language.name}</li>
        })
      }
      <br />
      <img src={country.flag} width="100px" alt={country.name} />
    </div>
  )
}

export default Country;