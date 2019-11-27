import { RECEIVE_PREDICTION, REQUEST_PREDICTION, REQUEST_SIMULATION, SET_SIMULATION_PARAMETERS } from './actionTypes';
import { apiUrl, startPrediction, startSim } from '../../config';
import { receiveEmissions } from './emissionActions';

const header = new Headers({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
});

export function setSimulationParameter(params) {
  let input_keys = ['temp', 'hum', 'WIND_SPEED', 'WIND_DIR'];
  switch (params.output_key) {
    case 'pm10':
      input_keys.push('PMx');
      break;
    case 'pm2.5':
      input_keys.push('PMx');
      break;
    case 'no2':
      input_keys.push('NOx');
      break;
    default:
      console.error('[REDUX ACTION] ' + params.output_key + ' not defined!')
  }
  return {
    type: SET_SIMULATION_PARAMETERS,
    input_keys: input_keys,
    ...params
  }
}

export function requestSimulation(params) {
  return {
    type: REQUEST_SIMULATION,
    params
  }
}

export function startSimulation(params) {
  return function(dispatch) {

    dispatch(requestSimulation(params));

    return fetch(apiUrl + startSim,{
      method: 'POST',
      headers: header,
      body: JSON.stringify(params)
    })
      .then(response => response.json(),
        error => console.log('An error occurred', error))
      .then(json => dispatch(receiveEmissions(params, json)))
      .catch(error => console.log('An error occurred', error))
  }
}


export function requestPrediction(params) {
  return {
    type: REQUEST_PREDICTION,
    params
  }
}

export function receivePrediction(params, json) {
  console.log(json);
  return {
    type: RECEIVE_PREDICTION,
    prediction: JSON.parse(json),
    receivedAt: Date.now()
  }
}

export function fetchPrediction(params) {
  return function(dispatch) {

    dispatch(requestPrediction(params));

    return fetch(apiUrl + startPrediction, { headers: header, method: 'POST', body: JSON.stringify(params) })
      .then(response => response.json(),
        error => console.log('An error occurred', error))
      .then(json => dispatch(receivePrediction(params, json)))
      .catch(error => console.log('An error occurred', error))
  }
}

