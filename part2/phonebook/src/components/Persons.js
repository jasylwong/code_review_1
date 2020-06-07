import React from 'react';

const Persons = ({ persons, onClick }) => {
  return (
    <div>
      {
        persons.map((person, i) => {
          return (
            <div key={i}>
              {`${person.name} ${person.number} `}
              <button onClick={() => onClick(person)}>delete</button>
            </div>
          )
        })
      }
    </div>
  )
}

export default Persons;