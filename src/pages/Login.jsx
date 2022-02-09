import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ChangeTheme from '../components/change_theme';
import Auth from '../helpers/secutiry';
import styles from '../styles/Login.module.css';

function Login() {
  const history = useHistory();

  if (!Auth()) history.push('/foods');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/foods');
  };

  useEffect(() => {
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
    validateForm();
  }, [email, password]);
  return (
    <>
      <div className="center_middle flex flex_direction_column box login">
        <h1 className={ styles.title }>iRecipes</h1>
        <form className="form">
          <input
            type="email"
            data-testid="email-input"
            name="email"
            value={ email }
            placeholder="E-mail"
            onChange={ ({ target }) => setEmail(target.value) }
          />
          <input
            type="password"
            data-testid="password-input"
            name="password"
            value={ password }
            placeholder="Senha"
            onChange={ ({ target }) => setPassword(target.value) }
          />
          <button
            type="submit"
            data-testid="login-submit-btn"
            onClick={ handleSubmit }
            disabled={ disabled }
          >
            Enter
          </button>
        </form>
      </div>
      <ChangeTheme />
    </>
  );
}

export default Login;
