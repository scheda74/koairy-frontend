import { REQUEST_SIMULATION } from './actionTypes';
import { apiUrl, startSim } from '../../config';
import { receiveEmissions } from './emissionActions';

const header = new Headers({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
});

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




// export function fetchPredictionUnsuccessful(params, error) {
//   return {
//     type: RECEIVE_PREDICTION
//   }
// }



