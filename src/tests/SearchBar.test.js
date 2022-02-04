import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouteReduxAndContext from './renderWithRouteReduxAndContext';
import SearchBar from '../components/SearchBar';

describe('Testando o componente SearchBar', () => {
  it('testando', () => {
    renderWithRouteReduxAndContext(<SearchBar />);
  });
});
