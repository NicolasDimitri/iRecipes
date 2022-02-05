import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import renderWithRouteReduxAndContext from './renderWithRouteReduxAndContext';
import NotFoundPage from '../pages/NotFoundPage';

describe('Testando a pagina NotFound', () => {
  afterEach(() => cleanup());

  it('Verifica se o texto esta correto',
    async () => {
      const route = '*';
      const initialEntries = ['/XABLAUU'];
      renderWithRouteReduxAndContext(
        <NotFoundPage />,
        route, initialEntries,
      );

      expect(screen.getByTestId('not-found-container'))
        .toBeInTheDocument();
      expect(screen.getByTestId('not-found-container'))
        .toHaveTextContent('Not Found');
    });
});
