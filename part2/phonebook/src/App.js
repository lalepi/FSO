import React from 'react';
import { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({ person, removePerson }) => (
  <div>
    {person.name} {person.number}{" "}
    <button onClick={() => removePerson(person.id)}> Delete</button>
  </div>
)

const Persons = ({ persons, removePerson }) => {

  return (
    <div>
      {persons.map(person =>
        <Person
          key={person.id}
          person={person}
          removePerson={removePerson}
        />
      )}
    </div>
  )
}

const Filter = ({ newFilter, handleFilterChange }) => (

  <div>
    filter shown with: <input
      value={newFilter}
      onChange={handleFilterChange}
    />
  </div>
)

const PersonForm = ({
  onSubmit,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange }) => (

  <form onSubmit={onSubmit} >
    <div>
      name: <input
        value={newName}
        onChange={handleNameChange}
      />
    </div>
    <div>
      number: <input
        value={newNumber}
        onChange={handleNumberChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [newFilter, setFilter] = useState('')

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
        })

    else

      if (window.confirm((`${newName} is already added to phonebook, replace the old number with new one? `)) === true)

        personService
          .update(found.id, updateData)
          .then(returnedPersons => {
            setPersons(persons.map(person => person.id !== found.id ? person : returnedPersons))
            setName('')
            setNumber('')
          })
  }

  const removePerson = (id) => {

    const person = persons.find(n => n.id === id)

    if (window.confirm(`Delete ${person.name}`) === true)

      personService
        .remove(id)
        .then(
          setPersons(
            persons.filter((person) => {
              return person.id !== id;
            }))
        )
  }

  return (
    <div>
      <h2>Phonebook</h2>
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