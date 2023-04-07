
import React from 'react';

const Header = (props) => {
  return (
    <div>
      <p> {props.course}</p>
    </div>

  )
}




const Part = (props) => {
  return (
    <div>
      <p>{props.details.part} {props.details.exercises} </p>
      
    </div>
  )
  }

const Content = (props) => {

  return (
    <div>
      < Part details={props.details[0]}/>
      < Part details={props.details[1]}/>
      < Part details={props.details[2]}/>
    </div>
  )
  }


const Total = (props) => {
  return(
    <div>

    <p>There is  {props.Value[0].exercises + props.Value[1].exercises + props.Value[2].exercises} exercises </p>

   </div>
  )
}


const App = () => {

const course ='Half Stack application development'

const parts = [
 { part: 'Fundamentals of React',
  exercises: 10 },
 { part:'Using props to pass data',
  exercises: 7 },
 { part:'State of a component',
  exercises: 14 }
]


  return(
    <div>
      
        <Header course={course} /> 
        <Content details={parts} />
        <Total Value={parts} />
       
    </div>
  )

}

export default App;
