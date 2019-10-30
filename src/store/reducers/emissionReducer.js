import {
  INVALIDATE_EMISSIONS,
  RECEIVE_EMISSIONS, RECEIVE_PREDICTION,
  REQUEST_EMISSIONS, REQUEST_PREDICTION
} from '../actions/actionTypes';


export function emissions(
  state = {
    isFetching: false,
    didInvalidate: false,
    }, action) {
  switch (action.type) {
    case INVALIDATE_EMISSIONS:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case REQUEST_EMISSIONS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_EMISSIONS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        data: JSON.parse(action.emissions),
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}