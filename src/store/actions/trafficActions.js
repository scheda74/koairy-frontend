import { INVALIDATE_TRAFFIC, RECEIVE_TRAFFIC, REQUEST_TRAFFIC } from './actionTypes';

const header = new Headers({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
});

export function invalidateTraffic(params) {
  return {
    type: INVALIDATE_TRAFFIC,
    params
  }
}

export function requestTraffic(params) {
  return {
    type: REQUEST_TRAFFIC,
    params
  }
}

export function receiveTraffic(params, json) {
  console.log(json);
  return {
    type: RECEIVE_TRAFFIC,
    params,
    traffic: json,
    receivedAt: Date.now()
  }
}

export function fetchTraffic(params) {
  return function(dispatch) {

    dispatch(requestTraffic(params));

    return fetch('http://smart-mobility.ge57.spacenet.de/bremicker/measures', { headers: header })
      .then(response => response.json(),
        error => console.log('An error occurred', error))
      .then(json => dispatch(receiveTraffic(params, json)))
      .catch(error => console.log('An error occurred', error))
  }
}

function shouldFetchTraffic(state, params) {
  const traffic = state.traffic.data;
  console.log(traffic);
  if (!traffic) {
    return true
  } else if (traffic.isFetching) {
    return false
  } else {
    return traffic.didInvalidate
  }
}

export function fetchTrafficIfNeeded(params) {
  return (dispatch, getState) => {
    if (shouldFetchTraffic(getState(), params)) {
      // Dispatch a thunk from thunk!
      console.log("fetching data now...");
      return dispatch(fetchTraffic(params))
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve()
    }
  }
}