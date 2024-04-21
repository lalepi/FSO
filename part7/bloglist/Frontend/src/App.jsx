import { useEffect, React, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'

import FrontPage from './components/FrontPage'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Users from './components/Users'
import SingleUser from './components/SingleUser'
import SingleBlog from './components/SingleBlog'
import NavigationMenu from './components/NavigationMenu'

import Box from '@mui/material/Box'

const App = () => {
    const [user, setUser] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeUsers())
        dispatch(initializeBlogs())
    }, [])

    const checkUser = useSelector((state) => state.login)
    useEffect(() => {
        setUser(checkUser)
    }, [checkUser])

    return (
        <div>
            <NavigationMenu />
            <Box sx={{ height: '50px' }}>
                <Notification />
            </Box>

            <Routes>
                <Route path="/" element={<FrontPage />} />
                <Route
                    path="/blogs"
                    element={user ? <Blog /> : <Navigate replace to="/" />}
                />
                <Route
                    path="/blogs/:id/*"
                    element={
                        user ? <SingleBlog /> : <Navigate replace to="/" />
                    }
                />
                <Route
                    path="/users/*"
                    element={user ? <Users /> : <Navigate replace to="/" />}
                />
                <Route
                    path="/users/:id/*"
                    element={
                        user ? <SingleUser /> : <Navigate replace to="/" />
                    }
                />
            </Routes>
        </div>
    )
}

export default App
