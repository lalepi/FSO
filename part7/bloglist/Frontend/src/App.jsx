import { useState, useEffect, React, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import{ setNotification} from './reducers/notificationReducer'
import { initializeBlogs, createBlog, setBlogs} from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

import storage from './services/storage'
import Login from './components/Login'

const App = () => {
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  const dispatch = useDispatch()

  useEffect(() => {
     dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const user = storage.loadUser()
    if (user) {
      setUser(user)
    }
  }, [])

const blogs = useSelector(state => state.blogs)

  console.log(blogs)

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();

      dispatch(createBlog(blogObject))
      const message = (`a new blog ${blogObject.title} by ${blogObject.author} added`)
      const time = 5
      dispatch(setNotification(message, time))
  };

  // const toggleLike = (id) => {
  //   const blog = blogs.find((n) => n.id === id);
  //   const like = blog.likes + 1;
  //   const changedBlog = { ...blog, likes: like };

  //   blogService.update(id, changedBlog).then((returnedBlog) => {
  //     setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
  //   });
  // };


  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      setUser(user)
      storage.saveUser(user)
      const message = (`welcome ${user.name}`)
      const time = 5
      dispatch(setNotification(message, time))

    } catch (error) {

      const message = ("wrong username or password")
      const time = 5
      dispatch(setNotification(message, time))
    }
  };

  const handleLogout = () => {
    setUser(null)
    storage.removeUser()
  };

  const logoutUser = () => (
    <div>
      {user && (
        <div>
          <p>
            {user.name} logged in <button onClick={handleLogout}>Logout</button>
          </p>
        </div>
      )}
    </div>
  );

  const blogForm = () => (
    <Togglable
      buttonLabel="Create new blog"
      buttonLabelBack="cancel"
      ref={blogFormRef}
    >
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  const removeBlog = (id) => {
    const blog = blogs.find((n) => n.id === id);
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`) === true)
      blogService.remove(id).then(
        setBlogs(
          blogs.filter((blog) => {
            return blog.id !== id;
          })));
      const message = (`Blog '${blog.title} by ${blog.author}' has been removed`)
      const time = 5
      dispatch(setNotification(message, time))
  };



  const byLikes = (a, b) => b.likes - a.likes

  const allBlogs = () => {

    console.log("blogs", blogs)
    // const sortedBlogs = blogs.sort((a, b) => {
    //   if (a.likes < b.likes) return 1;
    //   if (a.likes > b.likes) return -1;
    //   return 0;
    //const sortedBlogs = blogs.sort((a, b) => { b.likes - a.likes } )
    //const byLikes = (a, b) => b.likes - a.likes

   const sortedBlogs = blogs
    
    return (
      <div>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            toggleLike={() => toggleLike(blog.id)}
            removeBlog={() => removeBlog(blog.id)}
          />
        ))}
      </div>
    );
  };

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification/>
        <Login doLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification/>
      {logoutUser()}
      {blogForm()}
      {allBlogs()}
    </div>
  );
};

export default App;
