import { useState, useEffect, React, createRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import {
    initializeBlogs,
    createBlog,
    voteBlog,
    removeBlog,
} from './reducers/blogReducer'
import { loginCredentials, logoutCredentials } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import storage from './services/storage'
import Login from './components/Login'
import Users from './components/Users'
import SingleUser from './components/SingleUser'
import SingleBlog from './components/SingleBlog'
import NavigationMenu from './components/NavigationMenu'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useNavigate,
    useMatch,
} from 'react-router-dom'

const HomePage = () => (
    <div>
        <h2>Super khuul frontpage info</h2>
    </div>
)

const App = () => {
    const [user, setUser] = useState(null)

    const blogFormRef = createRef()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUsers())
    }, [])

    const currentUser = () => {
        const user = useSelector((state) => state.login)
        return user
    }

    useEffect(() => {
        const user = storage.loadUser()
        if (user) {
            setUser(user)
            // navigate('/blogs')
        }
    }, [currentUser()])

    const sortBlogs = () => {
        const blogs = useSelector((state) => state.blogs)
        const temp = [...blogs]
        return temp.sort((a, b) => {
            if (a.likes < b.likes) return 1
            if (a.likes > b.likes) return -1
            return 0
        })
    }
    const blogs = sortBlogs()

    const addBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility()
        dispatch(createBlog(blogObject))
    }

    const handleLogin = async (credentials) => {
        dispatch(loginCredentials(credentials))
    }

    const handleLogout = () => {
        dispatch(logoutCredentials())
        setUser(null)
    }

    const toggleLike = (blog) => {
        dispatch(voteBlog(blog))
    }

    const dismissBlog = (blog) => {
        dispatch(removeBlog(blog))
        ////korjaa tämä, ei päivity listaus////
        navigate(`/users/`)
    }

    const blogForm = () => (
        <Togglable
            buttonLabel="Create new blog"
            buttonLabelBack="cancel"
            ref={blogFormRef}
        >
            <BlogForm createBlog={addBlog} />
        </Togglable>
    )

    const UserData = () => {
        const data = () => {
            const userInfo = useSelector((state) => state.users)
            return userInfo
        }

        const users = data() ? data() : null
        return users
    }

    const allUsers = UserData()

    const match = useMatch('/users/:id')
    const singleUserData = match
        ? allUsers.find((user) => user.id === match.params.id)
        : null

    const blogMatch = useMatch('/blogs/:id')
    const singleBlogData = blogMatch
        ? blogs.find((blog) => blog.id === blogMatch.params.id)
        : null

    return (
        <div>
            <NavigationMenu
                user={user}
                logout={handleLogout}
                login={handleLogin}
            />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/blogs"
                    element={<Blog blog={blogs} create={blogForm()} />}
                />
                <Route
                    path="/users/*"
                    element={<Users allUsers={allUsers} />}
                />
                <Route
                    path="/users/:id/*"
                    element={<SingleUser user={singleUserData} />}
                />
                <Route
                    path="/blogs/:id/*"
                    element={
                        <SingleBlog
                            blog={singleBlogData}
                            toggleLike={() => toggleLike(singleBlogData)}
                            removeBlog={() => dismissBlog(singleBlogData)}
                        />
                    }
                />
            </Routes>

            <Notification />
        </div>
    )
}

export default App
