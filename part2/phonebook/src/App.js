import React from 'react';

import { useState } from 'react'





const App = () => {
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')


const Name = ({ name }) => {
  return (
     <div> {name.name} </div>

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

 
    persons.forEach((persons) => {

      if (nameObject.name === persons.name) {
        alert(`${newName} is already added to phonebook`)
      }
      else {
        setPersons(persons.concat(nameObject))
        setNewName('')
      }
    })

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
          <Name key={name.name} name={name} />
        )}
      </div>
      ...

      

    </div>
  )

}

export default App