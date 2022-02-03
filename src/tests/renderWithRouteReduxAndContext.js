import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createStore } from 'redux';
import AplicationContext from '../context/AplicationContext';
import rootReducer from '../redux/reducers';

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
