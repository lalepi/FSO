import React from 'react'

const Person = ({ person, removePerson }) => (
  <div>
    {person.name} {person.number}{' '}
    <button onClick={() => removePerson(person.id)}> Delete</button>
  </div>
)

export default Person