import React from 'react';

const Course = ({ course }) => {

  const Header = ({ name }) => {
    return (
      <div>
        <h1>{name}</h1>
      </div>

    )
  }
  
  const Part = ({ parts }) => {
    return (
      <div>
        <p>{parts.name} {parts.exercises} </p>
      </div>
    )
  }

  const Content = ({ parts }) => {
    return (
      <div>
        <ul>
        {parts.map(parts =>
        < Part key={parts.id} parts={parts} />
        )}

        </ul>
      </div>
    )
  }

  const Total = ({parts}) => {

  const totalAmount = parts.reduce((sum, value) => sum + value.exercises,0)

    return (
      <div>
        <ul>
      <b>Total of {totalAmount} exercises </b> 
        </ul>
      </div>
    )
  }


  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )

}




const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App