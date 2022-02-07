import { cleanup, screen } from '@testing-library/react';
import React from 'react';
import NotFoundPage from '../pages/NotFoundPage';
import renderWithRouteReduxAndContext from './renderWithRouteReduxAndContext';

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
