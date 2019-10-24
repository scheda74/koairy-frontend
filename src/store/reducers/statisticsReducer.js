import {
  RECEIVE_EMISSIONS,
  RECEIVE_STATISTICS,
  REQUEST_EMISSIONS,
  REQUEST_STATISTICS
} from '../actions/actionTypes';


export function statistics(
  state = {
    isFetching: false,
    data: []
  }, action) {
  switch (action.type) {
    case REQUEST_STATISTICS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_STATISTICS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.data,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}