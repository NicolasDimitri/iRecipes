import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouteReduxAndContext from './renderWithRouteReduxAndContext';
import Profile from '../pages/Profile';

describe('Testando a pagina de perfil', () => {
  beforeEach(() => {
    renderWithRouteReduxAndContext(<Profile />);
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
});
