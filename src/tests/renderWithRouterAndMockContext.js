import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createStore } from 'redux';
import rootReducer from '../redux/reducers';
import AplicationContext from '../context/AplicationContext';

/**
 *
 * @function renderWithRouteReduxAndContext
 * @param {*} component - O componente a ser renderizado
 * @param {{}} param2 - Opcional,um objeto com as chaves initialState (Chaves do Redux)ou/e initialEntries (Stings de rotas), contextValue (Objeto)
 * @returns - Todos as funcoes do render, o history e a store com todas suas funcoes
 */

const renderWithRouterAndMockContext = (
  component,
  {
    contextValue,
    initialState = {},
    store = createStore(rootReducer, initialState),
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) => ({
  ...render(
    <Router history={ history }>
      <Provider store={ store }>
        <AplicationContext.Provider value={ contextValue }>
          {component}
        </AplicationContext.Provider>
      </Provider>
    </Router>,
  ),
  history,
  store,
  contextValue,
});

export default renderWithRouterAndMockContext;
