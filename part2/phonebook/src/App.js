import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const onChange = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const newPersons = [...persons, { name: newName}]
    console.log(newPersons);
    setPersons(newPersons)
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={onChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map((person, i) => {
          return <div key={i}>{person.name}</div>
        })
      }
    </div>
  )
}

export default App
