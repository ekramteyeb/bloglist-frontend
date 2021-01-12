import React from 'react'
import PropTypes from 'prop-types'


const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div style={{ display:'inline-block' }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username :
          <input id='username'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <br/>
        <div>
          password :
          <input id='password'
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <br/>
        <button  id='login-button' type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
export default LoginForm