import {
  FETCH_TRAFFIC,
  INVALIDATE_TRAFFIC,
  RECEIVE_TRAFFIC,
  REQUEST_TRAFFIC
} from '../actions/actionTypes';


export function traffic(
  state = {
    isFetching: false,
    didInvalidate: false,
    data: null
  }, action) {
  switch (action.type) {
    case INVALIDATE_TRAFFIC:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case REQUEST_TRAFFIC:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_TRAFFIC:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        data: action.traffic,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}