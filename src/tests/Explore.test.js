import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import renderWithRouteReduxAndContext from './renderWithRouteReduxAndContext';
import Explore from '../pages/Explore';

describe('Testando a pagina Explore', () => {
  afterEach(() => cleanup());
  it('Verifica se o componente renderiza com o header e footer corretos', async () => {
    const route = '/explore';
    const initialEntries = ['/explore'];
    const history = createMemoryHistory({ initialEntries });
    renderWithRouteReduxAndContext(
      <Explore history={ history } />,
      route, initialEntries,
    );
    expect(await screen.findByTestId('page-title')).toHaveTextContent('Explore');
    expect(screen.queryByTestId('search-top-btn')).not.toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
  it('Verifica se o usuario e redirecionado ao clicar na area correspondente',
    async () => {
      const route = '/explore';
      const initialEntries = ['/explore'];
      const history = createMemoryHistory({ initialEntries });
      renderWithRouteReduxAndContext(
        <Explore history={ history } />,
        route, initialEntries,
      );
      expect(await screen.findByTestId('explore-foods'))
        .toHaveTextContent('Explore Foods');
      userEvent.click(screen.getByTestId('explore-foods'));
      expect(history.location.pathname).toBe('/explore/foods');

      history.goBack();

      expect(screen.getByTestId('explore-drinks'))
        .toHaveTextContent('Explore Drinks');
      userEvent.click(screen.getByTestId('explore-drinks'));
      expect(history.location.pathname).toBe('/explore/drinks');
    });
});
