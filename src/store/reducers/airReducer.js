import { RECEIVE_LATEST_AIR, REQUEST_LATEST_AIR } from '../actions/actionTypes';


export function air(
  state = {
    isFetching: false,
    didInvalidate: false,
  }, action) {
  switch (action.type) {
    case REQUEST_LATEST_AIR:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_LATEST_AIR:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        sensors: [
          {
            [action.id]: {
              location: action.location,
              values: action.values
            }
          }
        ],
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}