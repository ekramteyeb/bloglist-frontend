import React from 'react'
import PropTypes from 'prop-types'


const SignUpForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  handleNameChange,
  username,
  name,
  password
}) => {
  return (
    <div style={{ display:'inline-block' }}>
      <h2>Sign Up</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username :
          <input id='usernamesup'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <br/>
        <div>
          name :
          <input id='name'
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <br/>
        <div>
          password :
          <input id='passwordsup'
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <br/>
        <button  id='signup-button' type="submit">signup</button>
      </form>
    </div>
  )
}

SignUpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
export default SignUpForm