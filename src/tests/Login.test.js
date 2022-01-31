import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const INPUT_PASSWORD = screen.getByTestId('password-input');

describe('2 - Login Page', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Must have the title Login', () => {
    const title = screen.getByRole('heading', { name: /login/i });
    expect(title).toBeInTheDocument();
  });

  it('Must have the inputs email and password', () => {
    const inputEmail = screen.getByRole('textbox');
    // const inputPassword = screen.getByTestId('password-input');
    expect(inputEmail).toBeInTheDocument();
    expect(INPUT_PASSWORD).toBeInTheDocument();
  });

  it('Check that button is disabled', () => {
    const btnLogin = screen.getByRole('button', { name: /enter/i });
    expect(btnLogin).toBeInTheDocument();
    expect(btnLogin).toHaveAttribute('disabled');
  });

  it('Tests if when typing invalid email the button has the attribute disabled', () => {
    const inputEmail = screen.getByRole('textbox');
    // const inputPassword = screen.getByTestId('password-input');
    const btnLogin = screen.getByRole('button', { name: /enter/i });
    const email = 'testmail.com';
    const password = '1234567';

    userEvent.type(inputEmail, email);
    userEvent.type(INPUT_PASSWORD, password);
    expect(btnLogin).toHaveAttribute('disabled');
  });

  it('Tests if typing invalid password the button has the attribute disabled', () => {
    const inputEmail = screen.getByRole('textbox');
    // const inputPassword = screen.getByTestId('password-input');
    const btnLogin = screen.getByRole('button', { name: /enter/i });
    const email = 'test@mail.com';
    const password = '12345';

    userEvent.type(inputEmail, email);
    userEvent.type(INPUT_PASSWORD, password);
    expect(btnLogin).toHaveAttribute('disabled');
  });

  it('Test if typing valid email and password the button is activated', () => {
    const inputEmail = screen.getByRole('textbox');
    // const inputPassword = screen.getByTestId('password-input');
    const btnLogin = screen.getByRole('button', { name: /enter/i });
    const email = 'test@mail.com';
    const password = '1234567';

    userEvent.type(inputEmail, email);
    userEvent.type(INPUT_PASSWORD, password);
    expect(btnLogin).not.toHaveAttribute('disabled');
  });
});
