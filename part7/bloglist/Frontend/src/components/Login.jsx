import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { loginCredentials } from '../reducers/loginReducer'

import { Typography, Button } from '@mui/material'
import Input from '@mui/material/Input'
const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const Login = async (credentials) => {
        dispatch(loginCredentials(credentials))
    }

    const handleLogin = (event) => {
        event.preventDefault()
        Login({ username, password })
        setUsername('')
        setPassword('')
    }

    return (
        <form onSubmit={handleLogin}>
            <Typography component="div">
                Sign In
                <Input
                    sx={{ marginRight: '10px', marginLeft: '10px' }}
                    placeholder=" username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    sx={{ marginRight: '10px' }}
                    placeholder=" password"
                    required
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button color="inherit" type="submit">
                    Login
                </Button>
            </Typography>
        </form>
    )
}

export default Login
