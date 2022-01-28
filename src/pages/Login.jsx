import React, { useEffect, useState } from 'react';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const validateForm = () => {
    const minPasswordLength = 6;
    const regex = /^[\w]+([.|\-|_][A-Za-z0-9]+)*@[a-z]{2,}(\.[a-z]{2,})+$/g;
    const emailIsValid = regex.test(email);

    if (password.length > minPasswordLength && emailIsValid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleSubmit = () => {
    validateForm();
  };

  useEffect(() => {
    validateForm();
  }, [email, password]);

  return (
    <div className="container">
      <div className="w-auto p-3">
        <h1>Login</h1>
        <form className="form">
          <input
            type="email"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
          <input
            type="password"
            data-testid="password-input"
            name="password"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
          />
          <button
            type="button"
            data-testid="login-submit-btn"
            onClick={ handleSubmit }
            disabled={ disabled }
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
