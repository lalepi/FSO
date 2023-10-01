import React from 'react';

const Notification = ({ message }) => {
  console.log(message)
  if (message === null) {
    return null
  }
  if (message.includes('removed'))
    return (
      <div className="delete">
        {message}
      </div>
    )
  if (message.includes('added'))
    return (
      <div className="add">
        {message}
      </div>
    )
  if (message.includes('changed'))
    return (
      <div className="change">
        {message}
      </div>
    )
  if (message.includes('validation'))
    return (
      <div className="delete">
        {message}
      </div>
    )

}

export default Notification