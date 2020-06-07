import React, { useState, useEffect } from 'react';
import personService from './services/persons'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import './App.css'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterString, setFilterString ] = useState('')
  const [ notification, setNotification ] = useState(null)

  useEffect(() => {
    personService.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const notifyWith = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 4000)
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterStringChange = (e) => {
    setFilterString(e.target.value)
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(person)
        .then(response => {
          const newPersons = persons.filter(p => p.id !== person.id)
          setPersons(newPersons)
          notifyWith(`${person.name} was deleted successfully.`)
        })
        .catch(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          notifyWith(`${person.name} had already been removed`, 'error')
        })
    }
  }

  const addPerson = (e) => {
    e.preventDefault()
    const currentPerson = persons.find(p => p.name === newName)
    if (currentPerson) {
      if (window.confirm(`${newName} is already added; replace the old number?`)) {
        const updatedPerson = { ...currentPerson, number: newNumber }
        personService.update(updatedPerson)
          .then(response => {
            const newPersons = persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson)
            setPersons(newPersons)
            notifyWith(`Changed number of ${currentPerson.name}`)
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      personService.create({ name: newName, number: newNumber })
      .then(addedPerson => {
        const newPersons = persons.concat(addedPerson.data)
        setPersons(newPersons)
        setNewName('')
        setNewNumber('')
        notifyWith(`Added ${newName}`)
      })
      .catch(error => {
        console.log(error.response.data.error)
        notifyWith(`${error.response.data.error} `, 'error')
      })
    }
  }

  const personsToShow = filterString.length === 0 ?
    persons : 
    persons.filter(p => p.name.toLowerCase().includes(filterString.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter newFilter={filterString} onChange={handleFilterStringChange} />
      <h2>Add a new contact</h2>
      <PersonForm 
        onSubmit={addPerson}
        newName={newName}
        onNameChange={handleNameChange}
        newNumber={newNumber}
        onNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} onClick={deletePerson} />
    </div>
  )
}

export default App
