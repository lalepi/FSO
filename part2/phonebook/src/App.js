import React from 'react'
import { useState, useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [Message, setMessage] = useState('')

  const handleNameChange = (event) => {
    setName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const filteredPersons =
    Filter === '' ? persons : persons.filter(x => x.name.toLowerCase().includes(newFilter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const newPersonData = { name: newName, number: newNumber }
    const found = persons.find(element => element.name === newName)
    const updateData = { ...found, name: newName, number: newNumber }

    if (found === undefined)
      personService
        .create(newPersonData)
        .then(returnedPersons => {
          setPersons(persons.concat(returnedPersons))
          setName('')
          setNumber('')

          setMessage(`User '${newName}' was added to phonebook`)
          setTimeout(() => { setMessage(null) }, 5000)

        })
        .catch(error => {
          setMessage(` ${error.response.data.error}`)
          setTimeout(() => { setMessage(null) }, 5000)

        })

    else

      if (window.confirm((`${newName} is already added to phonebook, replace the old number with new one? `)) === true)

        personService
          .update(found.id, updateData)
          .then(returnedPersons => {
            setPersons(persons.map(person => person.id !== found.id ? person : returnedPersons))
            setName('')
            setNumber('')
            setMessage(`User '${found.name}' number has been changed from ${found.number} to ${updateData.number}`)
            setTimeout(() => { setMessage(null) }, 5000)
          })
          .catch(error => {
            setMessage(` ${error.response.data.error}`)
            setTimeout(() => { setMessage(null) }, 5000)

          })
  }

  const removePerson = (id) => {

    const person = persons.find(n => n.id === id)

    if (window.confirm(`Delete ${person.name}`) === true)

      personService
        .remove(id)
        .then(
          setPersons(
            persons.filter((person) => { return person.id !== id })),
          setMessage(`User '${person.name}' has been removed`),
          setTimeout(() => { setMessage(null) }, 5000)
        )

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={Message} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h3>add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons
        persons={filteredPersons}
        removePerson={removePerson}
      />
    </div>

  )

}

export default App