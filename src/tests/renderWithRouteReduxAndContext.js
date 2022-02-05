import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min';
import rootReducer from '../redux/reducers';
import AplicationProvider from '../context/AplicationProvider';

/**
 *
 * @function renderWithRouteReduxAndContext
 * @param {*} component - O componente a ser renderizado
 * @param {{}} param2 - Opcional,um objeto com as chaves initialState (Chaves do Redux)ou/e initialEntries (Stings de rotas)
 * @returns - Todos as funcoes do render, o history e a store com todas suas funcoes
 */

const renderWithRouteReduxAndContext = (
  component,
  {
    initialState = {},
    store = createStore(rootReducer, initialState, applyMiddleware(thunk)),
    initialEntries = ['/'],
    route = '/',
    history = createMemoryHistory({ initialEntries }),
  } = {},
) => ({
  ...render(
    <MemoryRouter initialEntries={ initialEntries }>
      <Route path={ route }>
        <Provider store={ store }>
          <AplicationProvider>
            {component}
          </AplicationProvider>
        </Provider>
      </Route>
    </MemoryRouter>,
  ),
  history,
  store,
});

export default renderWithRouteReduxAndContext;
