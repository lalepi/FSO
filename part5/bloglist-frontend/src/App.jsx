import { useState, useEffect, React, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })

  }

  const toggleLike = id => {

    const blog = blogs.find(n => n.id === id)
    const like = blog.likes + 1
    const changedBlog = { ...blog, likes: like }

    blogService
      .update(id,changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
      username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
      password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  )


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    window.location.reload()
  }

  const logoutUser = () => (
    <div>
      {user && <div>
        <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
      </div>}
    </div>
  )

  const blogForm = () => (
    <Togglable buttonLabel="Create new blog" buttonLabelBack="cancel" ref={blogFormRef}>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  const removeBlog = id => {
    const blog = blogs.find(n => n.id === id)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`) === true)

      blogService
        .remove(id)
        .then(
          setBlogs(
            blogs.filter((blog) => {return blog.id !== id })),
          setMessage(`Blog '${blog.title} by ${blog.author}' has been removed`),
          setTimeout(() => { setMessage(null) }, 5000)
        )
  }

  const allBlogs = () => {

    const sortedBlogs = blogs.sort((a, b) => {
      if (a.likes < b.likes) return 1
      if (a.likes > b.likes) return -1
      return 0
    })

    return (
      <div>
        {sortedBlogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            user={user.username}
            toggleLike={() => toggleLike(blog.id)}
            removeBlog={() => removeBlog(blog.id)}
          />
        )}
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage}/>

        {!user && loginForm()}
      </div>
    )
  }

  return (
    <div>

      <h2>blogs</h2>
      <Notification message={message}/>
      {logoutUser()}
      {blogForm()}
      {allBlogs()}


    </div>
  )
}

export default App