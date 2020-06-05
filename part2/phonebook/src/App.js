import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ filteredPersons, setFilteredPersons ] = useState(null)
  const [ newFilter, setNewFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const onFilterChange = (e) => {
    setNewFilter(e.target.value)
    const filtered = persons.filter(person => {
      return person.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setFilteredPersons(filtered)
  }

  const onNameChange = (e) => {
    setNewName(e.target.value)
  }

  const onNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const names = Object.values(persons).map(person => person.name)
    if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPersons = [...persons, { name: newName, number: newNumber }]
      setPersons(newPersons)
      setNewName('')
      setNewNumber('')
    }
  }

  const personsToShow = filteredPersons ? filteredPersons : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input value={newFilter} onChange={onFilterChange}/></div>
      <h2>Add a new contact</h2>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={onNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={onNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        personsToShow.map((person, i) => {
          return <div key={i}>{person.name} {person.number}</div>
        })
      }
    </div>
  )
}

export default App
