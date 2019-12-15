import { REQUEST_SIMULATION } from '../actions/actionTypes';

export function simulation(
  state = {
    isFetching: false,
    didInvalidate: false
  }, action) {
  switch (action.type) {
    case REQUEST_SIMULATION:
      return Object.assign({}, state, {
        isFetching: true
      });
    default:
      return state;
  }
}