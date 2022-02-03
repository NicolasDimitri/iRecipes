import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createStore } from 'redux';
import rootReducer from '../redux/reducers';
import AplicationProvider from '../context/AplicationProvider';

const renderWithRouteReduxAndContext = (
  component,
  {
    initialState = {},
    store = createStore(rootReducer, initialState),
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) => ({
  ...render(
    <Router history={ history }>
      <Provider store={ store }>
        <AplicationProvider>
          {component}
        </AplicationProvider>
      </Provider>
    </Router>,
  ),
  history,
  store,
});

export default renderWithRouteReduxAndContext;
