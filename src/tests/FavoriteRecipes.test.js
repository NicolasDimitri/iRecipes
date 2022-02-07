import React from 'react';
import { screen } from '@testing-library/dom';
import FavoritesRecipes from '../pages/FavoritesRecipes';
import renderWithRouterAndMockContext from './renderWithRouterAndMockContext';

describe('Favorite Recipes', () => {
  it('Teste', () => {
    renderWithRouterAndMockContext(<FavoritesRecipes />);
    const heading = screen.getByRole('heading', { name: /favorite recipes/i });
    expect(heading).toBeInTheDocument();
  });
});
