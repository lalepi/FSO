import React from 'react';
import { useState } from 'react';


const Header = ({ header }) => <h1> {header} </h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text} </button>
)

const StatisticLine = ({ text, value }) => (

  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, bad, neutral }) => {

  const sumUp = good + neutral + bad
  const average = (good - bad) / sumUp
  const positivePercentage = (good / sumUp) * 100

  if (sumUp === 0)
    return (
      <h3>No feedback given </h3>
    )

  return (
    <table>
      <tbody>
        <StatisticLine text={"Good "} value={good} />
        <StatisticLine text={"Neutral "} value={neutral} />
        <StatisticLine text={"Bad "} value={bad} />
        <StatisticLine text={"Total "} value={sumUp} />
        <StatisticLine text={"average "} value={average} />
        <StatisticLine text={"positive "} value={positivePercentage + " %"} />
      </tbody>
    </table>
  )
}


const App = () => {
  // save clicks of each button to its own state

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToValueGood = good => { setGood(good) }
  const setToValueNeutral = neutral => { setNeutral(neutral) }
  const setToValueBad = bad => { setBad(bad) }

  return (
    <div>

      <Header header="Give feedback" />

      <Button handleClick={() => setToValueGood(good + 1)} text="Good" />
      <Button handleClick={() => setToValueNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setToValueBad(bad + 1)} text="bad" />

      <Header header="Statistics" />

      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}




export default App