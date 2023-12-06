import { useState, useEffect } from 'react'


const Blog = ({ blog, toggleLike}) => {

  const [user, setUser] = useState(null)
  const [blogVisible, setBlogVisible] = useState(false)

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }
  
  const label = 'like'

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user.username)
    }
  }, [])

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
 
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
      {blog.title} {blog.author}
        <button onClick={() => setBlogVisible(true)}>view</button>
      </div>

      <div style={showWhenVisible}>
        <div>
      Blog: {blog.title} {blog.author}
      </div>
      <div>
      URL: {blog.url}
      </div>
      <div>
      Likes: {blog.likes} <button onClick={toggleLike}>{label}</button>
      </div>
      <div>
      User: {user}
      </div>
        <button onClick={() => setBlogVisible(false)}>hide</button>
      </div>
    </div>
  )
 
}

export default Blog