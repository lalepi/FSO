import { useState } from 'react'

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
        <div>
      <label>
        Username:
        <input
          type="text"
          data-testid='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)} />
      </label>
      </div>
      <div>
      <label>
        Password:
        <input
          type="password"
          value={password}
          data-testid='password'
          onChange={(e) => setPassword(e.target.value)} />
      </label>
      <input type="submit" value="Login" />
      </div>
    </form>
  )
}

export default Login