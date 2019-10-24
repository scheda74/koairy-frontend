import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'

import './index.css';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

import rootReducer from './store/reducers/rootReducer';

import App from './container/App';
import { fetchEmissionsIfNeeded } from './store/actions/emissionActions';
import { fetchTrafficIfNeeded } from './store/actions/trafficActions';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

// const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    // loggerMiddleware // neat middleware that logs actions
  )
);

const target = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  target
);

store
  .dispatch(fetchEmissionsIfNeeded('reactjs'))
  .then(() => console.log(store.getState()));
store
  .dispatch(fetchTrafficIfNeeded('lol'))
  .then(() => console.log(store.getState()));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
