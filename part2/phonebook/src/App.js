import React from 'react';

import { useState } from 'react'





const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')


  const Name = ({ user }) => {
    return (
      <div> {user.name} </div>

    )
  }
  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)

  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      // id: persons.length + 1,
    }

    const found = persons.find(element => element.name === newName)

    found === undefined
      ? setPersons(persons.concat(nameObject)) + setNewName('')
      : alert(`${newName} is already added to phonebook`)

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName} >
        <div>

          name: <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>


        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(name =>
          <Name key={name.name} user={name} />
        )}
      </div>
      ...



    </div>
  )

}

export default App