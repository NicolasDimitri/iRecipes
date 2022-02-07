import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouteReduxAndContext from './renderWithRouteReduxAndContext';
import Profile from '../pages/Profile';

describe('Testando a pagina de perfil', () => {
  let history;
  beforeEach(() => {
    const user = { email: 'teste@trybe.com' };
    const userStringify = JSON.stringify(user);
    localStorage.setItem('user', userStringify);
    ({ history } = renderWithRouteReduxAndContext(<Profile />));
  //   const emailInput = screen.getByTestId('email-input');
  //   const passwordInput = screen.getByTestId('password-input');
  //   console.log(history.location);
  //   userEvent.type(emailInput, 'teste@trybe.com');
  //   userEvent.type(passwordInput, '1234567');
  //   userEvent.click(screen.getByTestId('login-submit-btn'));
  //   console.log(history.location);
  //   userEvent.click(screen.getByTestId('profile-top-btn'));
  //   console.log(history.location);
  });
  it('O e-mail deve estar na tela', () => {
    const email = screen.getByTestId('profile-email');
    expect(email).toBeInTheDocument();
  });
  it('Testando se os botões estão na tela', () => {
    const doneRecipes = screen.getByTestId('profile-done-btn');
    const favoriteRecipes = screen.getByTestId('profile-favorite-btn');
    const logout = screen.getByTestId('profile-logout-btn');
    expect(doneRecipes).toBeInTheDocument();
    expect(favoriteRecipes).toBeInTheDocument();
    expect(logout).toBeInTheDocument();
  });
  it('Testando se o E-mail salvo no LocalStorage é retornado na tela', () => {
    const emailElement = screen.getByTestId('profile-email');
    expect(emailElement.innerHTML).toBe('teste@trybe.com');
  });
  it('Testando se os botões inferiores estão na tela', () => {
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    const exploreBtn = screen.getByTestId('explore-bottom-btn');
    const foodsBtn = screen.getByTestId('food-bottom-btn');
    expect(drinksBtn).toBeInTheDocument();
    expect(exploreBtn).toBeInTheDocument();
    expect(foodsBtn).toBeInTheDocument();
  });
  it('Verifica se Page title esta na pagina', () => {
    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.innerHTML).toBe('Profile');
  });
  it('Verifica o direcionamento de rota do botão de bebidas', () => {
    const drinksBtn = screen.getByTestId('profile-done-btn');
    console.log(history.location.pathname);
    userEvent.click(drinksBtn);
    //   // history.push('/drinks');
    console.log(history.location.pathname);
  //   expect(history.location.pathname).toBe('/done-recipes');
  });
  // it('Verifica o direcionamento de rota do botão de comidas', () => {
  //   const foodsBtn = screen.getByTestId('food-bottom-btn');
  // });
  // it('Verifica o direcionamento de rota do botão de explorar', () => {
  //   const exploreBtn = screen.getByTestId('explore-bottom-btn');
  // });
  // it('Verifica o direcionamento de rota do botão de receitas favoritas', () => {
  //   const favoritesRecipesBtn = screen.getByTestId('profile-favorite-btn');
  // });
  // it('Verifica o direcionamento de rota do botão de logout', () => {
  //   const logoutBtn = screen.getByTestId('profile-logout-btn');
  // });
  // it('Verifica o direcionamento de rota do botão de receitas concluidas', () => {
  //   const doneRecipesBtn = screen.getByTestId('profile-done-btn');
  // });
  // it('Verifica o direcionamento de rota do botão de pagina de perfil', () => {
  //   const profileBtn = screen.getByTestId('profile-top-btn');
  // });
});
