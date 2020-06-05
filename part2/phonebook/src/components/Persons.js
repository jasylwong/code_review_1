import React from 'react';

const Persons = ({ persons }) => {
  return (
    <div>
      {
        persons.map((person, i) => {
          return <div key={i}>{person.name} {person.number}</div>
        })
      }
    </div>
  )
}

export default Persons;