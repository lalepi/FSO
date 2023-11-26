import { useState, useEffect, React } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


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


const addBlog = (event) => {
  event.preventDefault()
  const blogObject = {
    title: newTitle,
    author: newAuthor,
    url: newUrl
  }

  blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    })

}


const loginForm = () => (
  <form onSubmit={handleLogin}>
    <div>
      username
      <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
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
    setErrorMessage('wrong credentials')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
}

const handleLogout = async (event) => {
event.preventDefault()
window.localStorage.removeItem('loggedBlogUser')
window.location.reload();
}

const logoutUser = () => (
<div>
{user && <div>
  <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
  </div>}
</div>
)

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
      <Notification message={errorMessage}/>
      <h2>blogs</h2>
     
      {logoutUser()}

      <BlogForm 
       addBlog={addBlog}
       newTitle={newTitle}
       setNewTitle={setNewTitle}
       newAuthor={newAuthor}
       setNewAuthor={setNewAuthor}
       newUrl={newUrl}
       setNewUrl={setNewUrl}
      />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
    </div>
  )
}

export default App