import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import renderWithRouter from './renderWithRouter';

const CORRECT_EMAIL_TEST = 'linus_torvalds@mail.com';
const WRONG_EMAIL_TEST = 'linus_torvaldsmail.com';
const CORRECT_PASSWORD_TEST = '1234567';
const INPUT_EMAIL = screen.queryByTestId('email-input');
const INPUT_PASSWORD = screen.queryByTestId('password-input');

describe('Login Page', () => {
  it('Must have the title Login', () => {
    renderWithRouter(<Login />);
    const title = screen.getByRole('heading', { name: /iRecipes/i });
    expect(title).toBeInTheDocument();
  });

  it('Must have the inputs email and password', () => {
    renderWithRouter(<Login />);
    expect(INPUT_EMAIL).toBeDefined();
    expect(INPUT_PASSWORD).toBeDefined();
  });

  it('Check that button is disabled', () => {
    renderWithRouter(<Login />);
    const btnLogin = screen.getByRole('button', { name: /enter/i });
    expect(btnLogin).toBeInTheDocument();
    expect(btnLogin).toBeDisabled();
  });

  it('Tests if when typing invalid email the button has the attribute disabled', () => {
    renderWithRouter(<Login />);
    // const inputEmail = screen.getByRole('textbox');
    // const inputPassword = screen.getByTestId('email-input');
    const btnLogin = screen.getByRole('button', { name: /enter/i });

    userEvent.type(INPUT_EMAIL, WRONG_EMAIL_TEST);
    userEvent.type(INPUT_PASSWORD, CORRECT_PASSWORD_TEST);
    expect(btnLogin).toHaveAttribute('disabled');
  });

  it('Test if after login redirects to foods', async () => {
    const { history } = renderWithRouter(<Login />);
    // console.log(history.location.pathname);
    const btnLogin = screen.getByTestId('login-submit-btn');
    userEvent.type(screen.getByTestId('email-input'), CORRECT_EMAIL_TEST);
    userEvent.type(screen.getByTestId('password-input'), CORRECT_PASSWORD_TEST);
    userEvent.click(btnLogin);
    // console.log(history.location.pathname);
    expect(history.location.pathname).toEqual('/foods');
  });
});
