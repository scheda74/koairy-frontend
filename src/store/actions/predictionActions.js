import { apiUrl, startPrediction, startSinglePrediction } from '../../config';
import {
  INVALIDATE_PREDICTION,
  RECEIVE_PREDICTION,
  RECEIVE_SINGLE_PREDICTION,
  REQUEST_PREDICTION,
  SET_SIMULATION_PARAMETERS,
  SET_SINGLE_SIMULATION_PARAMETERS
} from './actionTypes';

const header = new Headers({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
});

export function setSimulationParameter(params) {
  return {
    type: SET_SIMULATION_PARAMETERS,
    ...params
  }
}

export function setSingleSimulationParameter(params) {
  return {
    type: SET_SINGLE_SIMULATION_PARAMETERS,
    ...params
  }
}

export function requestPrediction() {
  return {
    type: REQUEST_PREDICTION,
  }
}

export function receivePrediction(params, json) {
  return {
    type: RECEIVE_PREDICTION,
    prediction: json,
    receivedAt: Date.now()
  }
}

export function receiveSinglePrediction(params, json) {
  return {
    type: RECEIVE_SINGLE_PREDICTION,
    prediction: json,
    boxID: Number(params.boxID),
    receivedAt: Date.now()
  }
}

export function fetchPrediction(params) {
  return function(dispatch) {

    dispatch(requestPrediction());

    // console.log(params)

    return fetch(apiUrl + startPrediction, { headers: header, method: 'POST', body: JSON.stringify(params) })
      .then(response => response.json(),
        error => console.log('An error occurred', error))
      .then(json => dispatch(receivePrediction(params, json)))
      .catch(error => dispatch(invalidatePrediction(params, error)))
  }
}

export function fetchSinglePrediction(params) {
  return function(dispatch) {

    dispatch(requestPrediction());
    console.log('single prediction params', params);
    let body = {
      ...params,
      // ['box_id']: params['boxID']
    };
    console.log(body);


    return fetch(apiUrl + startSinglePrediction, { headers: header, method: 'POST', body: JSON.stringify(body) })
      .then(response => response.json(),
        error => console.log('An error occurred', error))
      .then(json => dispatch(receiveSinglePrediction(params, json)))
      .catch(error => dispatch(invalidatePrediction(params, error)))
  }
}


export function invalidatePrediction(params, error) {
  return {
    type: INVALIDATE_PREDICTION,
    params,
    error
  }
}