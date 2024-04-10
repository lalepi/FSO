import { useState } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useNavigate,
    useMatch,
} from 'react-router-dom'
import { Typography, Button } from '@mui/material'

const Login = ({ doLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (event) => {
        event.preventDefault()
        doLogin({ username, password })
        setUsername('')
        setPassword('')
    }

    return (
        <form onSubmit={handleLogin}>
            <Typography component="div">
                <label>
                    Username:
                    <input
                        type="text"
                        data-testid="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>

                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        data-testid="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <Button color="inherit" type="submit">
                    Login
                </Button>
            </Typography>
        </form>
    )
}

export default Login
