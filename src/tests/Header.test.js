import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouteReduxAndContext from './renderWithRouteReduxAndContext';
import Header from '../components/Header';

describe('Testando o componente Header', () => {
  it('Veriica se o titulo esta renderizando com o valor correto', () => {
    renderWithRouteReduxAndContext(
      <Header title="Testando" renderOptions />,
    );
    expect(screen.getByTestId('page-title').textContent).toBe('Testando');
  });
  it('Verifica se o botao de search nao esta sendo renderizado', () => {
    renderWithRouteReduxAndContext(
      <Header title="Testando" renderExplore={ false } />,
    );

    expect(screen.queryByTestId('search-top-btn')).not.toBeInTheDocument();
  });
  it('Verifica se o os filtros sao renderizados ao clickar no botao search',
    async () => {
      renderWithRouteReduxAndContext(
        <Header title="Testando" renderExplore />,
      );

      expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();

      console.log(screen.getByTestId('search-btn'));

      userEvent.click(screen.getByTestId('search-btn'));

      expect(await screen.findByTestId('search-input')).toBeInTheDocument();
    });
});
