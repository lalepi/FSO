import React from 'react';
import { useState } from 'react'



const Persons = ({ persons, newFilter }) => {

  const filteredPersons = persons.filter(x => x.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    filteredPersons.map((person) => (

      <div key={person.name}>
        {person.name} {person.number}{''}

      </div>
    )));
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

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
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

const addPerson =(event) => {
    event.preventDefault()

    const newPersonData = { name: newName, number: newNumber,}
     const found = persons.find(element => element.name === newName)
  
     found === undefined
       ? setPersons(persons.concat(newPersonData)) + setName('') + setNumber('')
       : alert(`${newName} is already added to phonebook`)

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
        persons={persons}
        newFilter={newFilter} />
    </div>
  )

}

export default App