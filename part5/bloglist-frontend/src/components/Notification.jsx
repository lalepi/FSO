const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  if (message.includes('wrong username'))
    return (
      <div className="error">
        {message}
      </div>
    )
  if (message.includes('a new blog'))
    return (
      <div className="add">
        {message}
      </div>
    )
  if (message.includes('removed'))
    return (
      <div className="delete">
        {message}
      </div>
    )
}


export default Notification