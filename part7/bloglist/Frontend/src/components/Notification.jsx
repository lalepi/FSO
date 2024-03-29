import { useSelector } from 'react-redux'
import React from 'react'
import { useState, useEffect } from 'react'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [show, setShow] = useState(false);

if (notification)
{
  const delayTime = notification[1] * 1000
  const message = notification[0]

  useEffect(() => {
    if (notification.length > 0) {
      setAlert(message);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, delayTime);
    }
  }, [notification]);

  if (show) { 
  if (alert.includes('wrong username'))
    return (
      <div className="error">
        {alert}
      </div>
    )
  if (alert.includes('a new blog'))
    return (
      <div className="add">
        {alert}
      </div>
    )
    if (alert.includes('welcome'))
    return (
      <div className="add">
        {alert}
      </div>
    )
  if (alert.includes('removed'))
    return (
      <div className="delete">
        {alert}
      </div>
    )
  }
}
else return null
}
export default Notification

