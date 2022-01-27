import React from 'react';
import '../styles/Login.css';

function Login() {
  return (
    <div className="container">
      <div className="w-auto p-3">
        <h1>Login</h1>
        <form className="form">
          <input type="email" data-testid="email-input" name="email" />
          <input type="password" data-testid="password-input" name="password" />
          <button type="button" data-testid="login-submit-btn">Enter</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
