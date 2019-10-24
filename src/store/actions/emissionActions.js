import {
  REQUEST_EMISSIONS,
  FETCH_EMISSIONS,
  INVALIDATE_EMISSIONS,
  RECEIVE_EMISSIONS,
  REQUEST_STATISTICS,
  FETCH_STATISTICS,
  RECEIVE_STATISTICS
} from './actionTypes';

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
  console.log(json);
  return {
    type: RECEIVE_EMISSIONS,
    params,
    emissions: json,
    receivedAt: Date.now()
  }
}

export function fetchEmissions(params) {
  return function(dispatch) {

    dispatch(requestEmissions(params));

    return fetch('http://localhost:5000/get/caqi', { headers: header })
      .then(response => response.json(),
          error => console.log('An error occurred', error))
      .then(json => dispatch(receiveEmissions(params, json)))
      .catch(error => console.log('An error occurred', error))
  }
}

function shouldFetchEmissions(state, params) {
  const emissions = state.emissions.data;
  console.log(emissions);
  if (!emissions) {
    return true
  } else if (emissions.isFetching) {
    return false
  } else {
    return emissions.didInvalidate
  }
}

export function fetchEmissionsIfNeeded(params) {
  return (dispatch, getState) => {
    if (shouldFetchEmissions(getState(), params)) {
      // Dispatch a thunk from thunk!
      console.log("fetching data now...");
      return dispatch(fetchEmissions(params))
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