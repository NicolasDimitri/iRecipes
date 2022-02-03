import React from 'react';
import renderWithRouteReduxAndContext from './renderWithRouteReduxAndContext';
import Header from '../components/Header';

describe('Testando o componente Header', () => {
  it('inicia', () => {
    const providerProps = {
      value: {
        renderButton: false,
      },
    };

    const { history } = renderWithRouteReduxAndContext(
      <Header title="testando" renderExplore />,
      { providerProps, initialEntries: ['/'] },
    );

    console.log(history);
  });
});
