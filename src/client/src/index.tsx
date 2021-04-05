import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { App } from './App';
import { ThemeContextProvider } from './context/ThemeContext.js';
import Reducers from './Reducers.js';

const store = createStore(Reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <ThemeContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeContextProvider>
  </Provider>,
  document.getElementById('root'),
);
