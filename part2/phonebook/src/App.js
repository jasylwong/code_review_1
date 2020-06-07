import React, { useState, useEffect } from 'react';
import axios from 'axios';
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ filteredPersons, setFilteredPersons ] = useState(null)
  const [ newFilter, setNewFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  useEffect(() => {
    personService.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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
      personService.create({ name: newName, number: newNumber })
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
      <Filter newFilter={newFilter} onChange={onFilterChange} />
      <h2>Add a new contact</h2>
      <PersonForm 
        onSubmit={onSubmit}
        newName={newName}
        onNameChange={onNameChange}
        newNumber={newNumber}
        onNumberChange={onNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
