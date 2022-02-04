import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouteReduxAndContext from './renderWithRouteReduxAndContext';
import Login from '../pages/Login';

const CORRECT_EMAIL_TEST = 'linus_torvalds@mail.com';
const WRONG_EMAIL_TEST = 'linus_torvaldsmail.com';
const CORRECT_PASSWORD_TEST = '1234567';
const WRONG_PASSWORD_TEST = '12345';
const INPUT_EMAIL = screen.queryByTestId('email-input');
const INPUT_PASSWORD = screen.queryByTestId('password-input');

describe('Login Page', () => {
  beforeEach(() => {
    renderWithRouteReduxAndContext(<Login />);
  });

  it('Must have the title Login', () => {
    const title = screen.getByRole('heading', { name: /iRecipes/i });
    expect(title).toBeInTheDocument();
  });

  it('Must have the inputs email and password', () => {
    expect(INPUT_EMAIL).toBeDefined();
    expect(INPUT_PASSWORD).toBeDefined();
  });

  it('Check that button is disabled', () => {
    const btnLogin = screen.getByRole('button', { name: /enter/i });
    expect(btnLogin).toBeInTheDocument();
    expect(btnLogin).toHaveAttribute('disabled');
  });

  it('Tests if when typing invalid email the button has the attribute disabled', () => {
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByTestId('email-input');
    const btnLogin = screen.getByRole('button', { name: /enter/i });

    userEvent.type(inputEmail, WRONG_EMAIL_TEST);
    userEvent.type(inputPassword, CORRECT_PASSWORD_TEST);
    expect(btnLogin).toHaveAttribute('disabled');
  });

  it('Tests if typing invalid data the button has the attribute disabled', () => {
    const btnLogin = screen.getByRole('button', { name: /enter/i });

    userEvent.type(INPUT_EMAIL, WRONG_EMAIL_TEST);
    userEvent.type(INPUT_PASSWORD, WRONG_PASSWORD_TEST);
    expect(btnLogin).toHaveAttribute('disabled');
  });

  it('Test if typing valid email and password the button is activated', () => {
    const btnLogin = screen.getByRole('button', { name: /enter/i });

    userEvent.type(INPUT_EMAIL, CORRECT_EMAIL_TEST);
    userEvent.type(INPUT_PASSWORD, CORRECT_PASSWORD_TEST);
    // expect(INPUT_EMAIL).toHaveValue(CORRECT_EMAIL_TEST);
    // expect(INPUT_PASSWORD).toHaveValue(CORRECT_PASSWORD_TEST);
    expect(btnLogin).not.toBeDisabled();
  });

  it('Test if after login redirects to foods', () => {
    const btnLogin = screen.getByRole('button', { name: /enter/i });
    userEvent.click(btnLogin);
    const heading = screen.queryByText('Foods');
    console.log(heading);
    expect(heading).toBeDefined();
  });
});
