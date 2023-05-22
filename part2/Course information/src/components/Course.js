import React from 'react';

const Course = ({ course }) => {

  const Name = ({ header, name, exercises }) => (<div> <h2>{header}</h2> <p>{name} {exercises} </p> </div>) 

  



  const Part = ({ parts, header }) => {
    const allExercises = parts.map((parts) => parts.exercises)
   
    return (
      <div>
        < Name header={header} />
        {parts.map((parts) => ( <Name key={parts.id} name={parts.name} exercises={parts.exercises} />))}
        < Total parts={allExercises} />
      </div>
    )
  }





  const Content = ({ course }) => {

    return (
      <div>
          {course.map((course) => (< Part key={course.id} header={course.name} parts={course.parts} />))}
      </div>
    )
  }





  const Total = ({ parts }) => {
    const totalAmount = parts.reduce(function (sum, value) {
      return sum + value;
    }, 0)

    return (
    <div>     
    <b>Total of {totalAmount} exercises </b>
    </div>
    )
  }





  

  return (
    <div>
      <Content course={course} />
    </div>
  )

}


export default Course