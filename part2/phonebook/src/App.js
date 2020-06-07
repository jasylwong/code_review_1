import React, { useState, useEffect } from 'react';
import personService from './services/persons'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ filteredPersons, setFilteredPersons ] = useState(null)
  const [ newFilter, setNewFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)

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
      if (window.confirm(`${newName} is already added; replace the old number?`)) {
        const currentPerson = persons.find(p => p.name === newName)
        const updatedPerson = { ...currentPerson, number: newNumber }
        personService.update(updatedPerson)
          .then(response => {
            const newPersons = persons.filter(p => p.id !== updatedPerson.id)
            setPersons([...newPersons, updatedPerson])
            setErrorMessage(`${newName} was updated successfully.`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
          })
      }
    } else {
      personService.create({ name: newName, number: newNumber })
      .then(response => {
        const newPersons = [...persons, { name: newName, number: newNumber }]
        setPersons(newPersons)
        setNewName('')
        setNewNumber('')
        setErrorMessage(`${newName} was added successfully.`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
    }
  }

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(person)
        .then(response => {
          const newPersons = persons.filter(p => p.id !== person.id)
          setPersons(newPersons)
          setErrorMessage(`${person.name} was deleted successfully.`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
    }
  }

  const personsToShow = filteredPersons ? filteredPersons : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
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
      <Persons persons={personsToShow} onClick={handleDelete} />
    </div>
  )
}

export default App
