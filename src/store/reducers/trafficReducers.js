import {
  INVALIDATE_TRAFFIC,
  RECEIVE_CURRENT_BREMICKER,
  RECEIVE_TRAFFIC,
  REQUEST_TRAFFIC,
  SET_SELECTED_BOX
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
        isFetching: false,
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
    case RECEIVE_CURRENT_BREMICKER:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        [action.boxId]: action.traffic,
        lastUpdated: action.receivedAt
      });
    case SET_SELECTED_BOX:
      return Object.assign({}, state, {
        selected: action.boxId
      });
    default:
      return state;
  }
}