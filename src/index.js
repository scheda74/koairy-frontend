import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk'
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import { darkGreenTheme } from './styles/customTheme';
import * as serviceWorker from './serviceWorker';
import './index.css';

import rootReducer from './store/reducers/rootReducer';

import App from './container/App';


/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  {
    prediction: {
      isFetching: false,
      didInvalidate: false,
      predictionModel: 'lin-reg',
      startDate: '2019-08-01',
      endDate: '2019-11-15',
      startHour: '07:00',
      endHour: '10:00',
      boxID: 672,
      weatherScenario: 0,
      inputKeys: ['temp', 'hum', 'WIND_SPEED', 'WIND_DIR'],
      outputKeys: ['no2', 'pm10'],
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
      vehicleNumber: undefined,
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
    <MuiThemeProvider theme={darkGreenTheme}>
      <Router basename={'/koairy'}>
        <App />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  target
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
