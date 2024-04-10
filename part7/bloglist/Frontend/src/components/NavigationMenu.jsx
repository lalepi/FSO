import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Login from './Login'

import Notification from './Notification'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useNavigate,
    useMatch,
} from 'react-router-dom'

const NavigationMenu = ({ user, logout, login }) => {
    const [logoutUser, setLogoutUser] = useState('')
    const [anchorElNav, setAnchorElNav] = useState(null)

    const navigate = useNavigate()

    const handleLogout = (event) => {
        event.preventDefault()
        logout({ logoutUser })
        setLogoutUser('')
        navigate('/')
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    if (!user) {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 0.5 }}
                        >
                            Log in to application
                        </Typography>
                        <Login doLogin={login} />
                    </Toolbar>
                </AppBar>
            </Box>
        )
    }

    return (
        <div>
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
                            sx={{ flexGrow: 0.5 }}
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
        </div>
    )
}

export default NavigationMenu
