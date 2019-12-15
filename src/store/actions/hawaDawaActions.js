import { apiUrl, currentAir } from '../../config';
import { INVALIDATE_AIR, RECEIVE_LATEST_AIR, REQUEST_LATEST_AIR } from './actionTypes';

const header = new Headers({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
});

export function requestAir() {
  return {
    type: REQUEST_LATEST_AIR,
  }
}

export function airDidInvalidate(response) {
  return {
    type: INVALIDATE_AIR,
    response
  }
}

export function receiveAir(json) {
  return {
    type: RECEIVE_LATEST_AIR,
    // id: json.id,
    // location: json.location,
    // values: json.values,
    sensors: json,
    receivedAt: Date.now()
  }
}

export function fetchLatestAir() {
  return async function(dispatch) {
    dispatch(requestAir());

    return await fetch(apiUrl + currentAir, {headers: header})
      .then(response => response.json(),
          error => dispatch(airDidInvalidate(error)))
      .then(json => dispatch(receiveAir(json)))
      .catch(error => dispatch(airDidInvalidate(error)))
  }
}