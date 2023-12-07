import { useState, useEffect } from 'react'


const Blog = ({ blog, user, toggleLike, removeBlog}) => {

  const [loggedUser, setLoggedUser] = useState(null)
  const [blogVisible, setBlogVisible] = useState(false)
  
  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }
  const allowRemove = {display: loggedUser === blog.user.username ? '' : 'none'}


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setLoggedUser(loggedUser.username)
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
          <button onClick={() => setBlogVisible(false)}>hide</button>
        </div>
        <div>
          URL: {blog.url}
        </div>
        <div>
          Likes: {blog.likes} <button onClick={toggleLike}>Like</button>
        </div>
        <div>
          User: {user}
        </div>
        <div style = {allowRemove}>
          <button onClick={() => removeBlog(blog.id)}>Remove</button>
        </div>
      </div>
    </div>
  )
 
}

export default Blog