import * as React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { logoutCredentials } from '../reducers/loginReducer'
import { setTheme } from '../reducers/themeReducer'
import storage from '../services/storage'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Switch from '@mui/material/Switch'
import Login from './Login'

const NavigationMenu = () => {
    const [logoutUser, setLogoutUser] = useState('')
    const [anchorElNav, setAnchorElNav] = useState(null)
    const [user, setUser] = useState(null)
    const [light, setLight] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.login)

    useEffect(() => {
        const user = storage.loadUser()
        if (user) {
            setUser(user)
            navigate('/blogs')
        }
    }, [currentUser])

    const Logout = () => {
        dispatch(logoutCredentials())
        setUser(null)
    }

    const handleLogout = (event) => {
        event.preventDefault()
        Logout({ logoutUser })
        setLogoutUser('')
        navigate('/')
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const themeSelect = (prev) => {
        setLight(prev)
        dispatch(setTheme(light))
    }

    if (!user) {
        return (
            <Box>
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 0.5 }}
                        >
                            Log in to application
                        </Typography>
                        <Login />
                        <Typography
                            variant="h7"
                            component="div"
                            sx={{ marginLeft: 'auto' }}
                        >
                            Theme
                            <Switch
                                color="inherit"
                                onClick={() => themeSelect((prev) => !prev)}
                            ></Switch>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        )
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        sx={{ mr: 2 }}
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block' },
                        }}
                    >
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Typography textAlign="center" variant="h6">
                                <Link to="/blogs">blogs</Link>
                            </Typography>
                        </MenuItem>
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Typography textAlign="center" variant="h6">
                                <Link to="/users">users</Link>
                            </Typography>
                        </MenuItem>
                    </Menu>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        {user.name} logged in
                    </Typography>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        The Blog App
                    </Typography>
                    <Typography variant="h7" component="div">
                        Theme
                        <Switch
                            color="inherit"
                            onClick={() => themeSelect((prev) => !prev)}
                        ></Switch>
                    </Typography>

                    <form onSubmit={handleLogout}>
                        <Button
                            color="inherit"
                            type="submit"
                            onClick={() => setLogoutUser(true)}
                        >
                            Logout
                        </Button>
                    </form>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavigationMenu
