import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { applyMiddleware, compose, createStore } from 'redux';
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

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  {
    emissions: {},
    simulation: {
      isFetching: false,
      didInvalidate: false,
      predictionModel: 'lstm',
      startDate: '2019-08-01',
      endDate: '2019-11-10',
      startHour: '0:00',
      endHour: '23:00',
      weatherScenario: 0,
      vehicleDistribution: {
        "HBEFA3/PC_D_EU2": 0.007,
        "HBEFA3/PC_D_EU3": 0.0251,
        "HBEFA3/PC_D_EU4": 0.0934,
        "HBEFA3/PC_D_EU5": 0.089,
        "HBEFA3/PC_D_EU6": 0.1,
        "HBEFA3/PC_G_EU2": 0.0764,
        "HBEFA3/PC_G_EU3": 0.0342,
        "HBEFA3/PC_G_EU4": 0.1907,
        "HBEFA3/PC_G_EU5": 0.1802,
        "HBEFA3/PC_G_EU6": 0.163,
        "HBEFA3/PC_Alternative": 0.02
      },
      srcWeights: {
      'aschheim_west': 0.1,
        'ebersberg_east': 0.37,
        'feldkirchen_west': 0.1,
        'heimstetten_industrial_1': 0.01,
        'heimstetten_industrial_2': 0.01,
        'heimstetten_residential': 0.18,
        'kirchheim_industrial_east': 0.01,
        'kirchheim_industrial_west': 0.01,
        'kirchheim_residential': 0.16,
        'unassigned_edges': 0.05
      },
      dstWeights: {
        'aschheim_west': 0.16,
          'ebersberg_east': 0.07,
          'feldkirchen_west': 0.16,
          'heimstetten_industrial_1': 0.14,
          'heimstetten_industrial_2': 0.14,
          'heimstetten_residential': 0.06,
          'kirchheim_industrial_east': 0.06,
          'kirchheim_industrial_west': 0.11,
          'kirchheim_residential': 0.05,
          'unassigned_edges': 0.05
      },
      vehicleNumber: 9500,
      timeSteps: 10800
    }
  },
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      // loggerMiddleware // neat middleware that logs actions
    )
  )
);
/* eslint-enable */

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
  .dispatch(fetchEmissionsIfNeeded())
  .then(() => console.log(store.getState()));

store
  .dispatch(fetchTrafficIfNeeded(''))
  .then(() => console.log(store.getState()));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
