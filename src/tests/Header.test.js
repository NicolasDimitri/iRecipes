import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouteReduxAndContext from './renderWithRouteReduxAndContext';
import Header from '../components/Header';
import AplicationContext from '../context/AplicationContext';

describe('Testando o componente Header', () => {
  it('Veriica se o titulo esta renderizando com o valor correto', () => {
    const providerProps = {
      value: {
        renderButton: false,
      },
    };

    renderWithRouteReduxAndContext(
      <Header title="Testando" renderOptions />,
      { providerProps },
    );
    expect(screen.getByTestId('page-title').textContent).toBe('Testando');
  });
  it('Verifica se o botao de search nao esta sendo renderizado', () => {
    const providerProps = {
      value: {},
    };

    renderWithRouteReduxAndContext(
      <Header title="Testando" renderExplore={ false } />,
      { providerProps },
    );

    expect(screen.queryByTestId('search-top-btn')).not.toBeInTheDocument();
  });
  it('Verifica se o os filtros sao renderizados ao clickar no botao search',
    async () => {
      const providerProps = {
        value: {
          renderButton: false,
        },
      };

      renderWithRouteReduxAndContext(
        <Header title="Testando" renderExplore />,
        { providerProps },
      );

      expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();

      console.log(screen.getByTestId('search-btn'));

      userEvent.click(screen.getByTestId('search-btn'));

      expect(await screen.findByTestId('search-input')).toBeInTheDocument();
    });
});
