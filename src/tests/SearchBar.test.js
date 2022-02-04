import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndMockContext from './renderWithRouterAndMockContext';
import SearchBar from '../components/SearchBar';

describe('Testando o componente SearchBar', () => {
  const contextValue = {
    renderButton: true,
  };
  it('testando', () => {
    renderWithRouterAndMockContext(<SearchBar />, { contextValue });
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });
});
