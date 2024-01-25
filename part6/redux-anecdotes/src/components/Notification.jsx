import { useSelector } from 'react-redux'
import React from 'react'
import { useState, useEffect } from 'react'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [show, setShow] = useState(false);

if (notification !== undefined)
{
  const delayTime = notification[1] * 1000
  const anecdote = notification[0]

  useEffect(() => {
    if (notification.length > 0) {
      setAlert(anecdote);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, delayTime);
    }
  }, [notification]);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return show ? (
    <div style={style}>
      {alert}
    </div>
  )
  : null
}
else return null
}
export default Notification