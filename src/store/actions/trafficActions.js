import {
  INVALIDATE_TRAFFIC,
  RECEIVE_CURRENT_BREMICKER,
  RECEIVE_TRAFFIC,
  REQUEST_TRAFFIC,
  SET_SELECTED_BOX
} from './actionTypes';
import { apiUrl, currentBremicker, getTraining } from '../../config';

const header = new Headers({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
});

export function invalidateTraffic(response) {
  console.log('invalidated')
  return {
    type: INVALIDATE_TRAFFIC,
    response
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
    traffic: JSON.parse(json),
    receivedAt: Date.now()
  }
}

export function fetchTraffic(params) {
  return function(dispatch, getState) {

    dispatch(requestTraffic(params));
    const state = getState();
    let body = {
      "start_date": state.simulation.startDate,
      "end_date": state.simulation.endDate,
      "start_hour": state.simulation.startHour,
      "end_hour": state.simulation.endHour,
      "boxID": 672
    };
    // return fetch('http://smart-mobility.ge57.spacenet.de/bremicker/measures', { headers: header })
    //   .then(response => response.json(),
    //     error => console.log('An error occurred', error))
    //   .then(json => dispatch(receiveTraffic(params, json)))
    //   .catch(error => console.log('An error occurred', error))
    return fetch(apiUrl + getTraining, { headers: header, method: 'POST', body: JSON.stringify(body) })
      .then(response => response.json(),
        error => dispatch(invalidateTraffic(error)))
      .then(json => dispatch(receiveTraffic(params, json)))
      .catch(error => dispatch(invalidateTraffic(error)))
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

export function receiveCurrentBremicker(boxID, json) {
  console.log('bremicker data received!')
  console.log(json);
  return {
    type: RECEIVE_CURRENT_BREMICKER,
    boxID: boxID,
    traffic: JSON.parse(json),
    receivedAt: Date.now()
  }
}


export function fetchCurrentBremicker(boxID) {
  return async function(dispatch, getState) {
    console.log('Fetching bremicker data!')

    dispatch(requestTraffic(boxID));
    dispatch(setSelectedBox(boxID));

    return await fetch(apiUrl + currentBremicker + boxID)
      .then(response => response.json(),
        error => dispatch(invalidateTraffic(error)))
      .then(json => dispatch(receiveCurrentBremicker(boxID, json)))
      .catch(error => dispatch(invalidateTraffic(error)))
  }
}

export function setSelectedBox(boxID) {
  return {
    type: SET_SELECTED_BOX,
    boxID: boxID
  }
}