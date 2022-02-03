import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import AplicationContext from '../context/AplicationContext';

const renderWithRouteReduxAndContext = (
  component,
  {
    providerProps,
    renderOptions,
    initialState = {},
    store = createStore(rootReducer, initialState),
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) => ({
  ...render(
    <Router history={ history }>
      <Provider store={ store }>
        <AplicationContext.Provider { ...providerProps }>
          {component}
        </AplicationContext.Provider>
      </Provider>
    </Router>,
  ),
  history,
  store,
  renderOptions,
});

export default renderWithRouteReduxAndContext;
