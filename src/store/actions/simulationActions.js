import { RECEIVE_PREDICTION, REQUEST_PREDICTION, REQUEST_SIMULATION, SET_SIMULATION_PARAMETERS } from './actionTypes';
import { apiUrl, startPrediction, startSim } from '../../config';
import { receiveEmissions } from './emissionActions';

const header = new Headers({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
});

export function setSimulationParameter(params) {
  return {
    type: SET_SIMULATION_PARAMETERS,
    weatherScenario: params.weatherScenario,
    vehicleDistribution: params.vehicleDistribution,
    srcWeights: params.srcWeights,
    dstWeights: params.dstWeights,
    vehicleNumber: params.vehicleNumber,
    timeSteps: params.timeSteps,
    predictionModel: params.predictionModel,
    startDate: params.startDate,
    endDate: params.endDate,
    startHour: params.startHour,
    endHour: params.endHour
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
    prediction: json,
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

