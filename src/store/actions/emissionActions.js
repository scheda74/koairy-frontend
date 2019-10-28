import {
  REQUEST_EMISSIONS,
  FETCH_EMISSIONS,
  INVALIDATE_EMISSIONS,
  RECEIVE_EMISSIONS,
  REQUEST_STATISTICS,
  FETCH_STATISTICS,
  RECEIVE_STATISTICS
} from './actionTypes';
import { setSimulationParameter } from './simulationActions';
import { apiUrl, getCaqi } from '../../config';

const header = new Headers({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
});

export function invalidateEmissions(params) {
  return {
    type: INVALIDATE_EMISSIONS,
    params
  }
}

export function requestEmissions(params) {
  return {
    type: REQUEST_EMISSIONS,
    params
  }
}

export function receiveEmissions(params, json) {
  return {
    type: RECEIVE_EMISSIONS,
    emissions: json,
    receivedAt: Date.now()
  }
}

export function fetchEmissions(params) {
  return function(dispatch) {

    dispatch(requestEmissions(params));

    return fetch(apiUrl + getCaqi, { headers: header, method: 'POST', body: JSON.stringify(params) })
      .then(response => response.json(),
          error => console.log('An error occurred', error))
      .then(json => dispatch(receiveEmissions(params, json)))
      .catch(error => console.log('An error occurred', error))
  }
}

function shouldFetchEmissions(state) {
  const emissions = state.emissions.data;
  // console.log(emissions);
  if (!emissions) {
    return true
  } else if (emissions.isFetching) {
    return false
  } else {
    return emissions.didInvalidate
  }
}

export function fetchEmissionsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchEmissions(getState())) {
      // Dispatch a thunk from thunk!
      console.log("fetching data now...");
      const state = getState();
      // console.log(state);
      return dispatch(fetchEmissions(state.simulation))
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve()
    }
  }
}


export function requestStatistics(params) {
  return {
    type: REQUEST_STATISTICS,
    params
  }
}

export function receiveStatistics(params, json) {
  return {
    type: RECEIVE_STATISTICS,
    params,
    statistics: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}