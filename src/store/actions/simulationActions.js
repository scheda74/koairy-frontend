import { REQUEST_SIMULATION, SET_SIMULATION_PARAMETERS } from './actionTypes';
import { receiveTraffic, requestTraffic } from './trafficActions';
import { apiUrl, getCaqi, startSim } from '../../config';
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
    timeSteps: params.timeSteps
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

    return fetch(apiUrl + getCaqi,{
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

