import React from 'react';

const Notification = ({ message }) => {
    
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
  
  }

  export default Notification