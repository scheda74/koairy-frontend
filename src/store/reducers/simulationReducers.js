
// srcWeights: [
//   {name: 'aschheim_west', value: 0.1},
//   {name: 'ebersberg_east', value: 0.37},
//   {name: 'feldkirchen_west', value: 0.1},
//   {name: 'heimstetten_industrial_1', value: 0.01},
//   {name: 'heimstetten_industrial_2', value: 0.01},
//   {name: 'heimstetten_residential', value: 0.18},
//   {name: 'kirchheim_industrial_east', value: 0.01},
//   {name: 'kirchheim_industrial_west', value: 0.01},
//   {name: 'kirchheim_residential', value: 0.16},
//   {name: 'unassigned_edges', value: 0.05}
// ],
//   dstWeights: [
//   {name: 'aschheim_west', value: 0.16},
//   {name: 'ebersberg_east', value: 0.07},
//   {name: 'feldkirchen_west', value: 0.16},
//   {name: 'heimstetten_industrial_1', value: 0.14},
//   {name: 'heimstetten_industrial_2', value: 0.14},
//   {name: 'heimstetten_residential', value: 0.06},
//   {name: 'kirchheim_industrial_east', value: 0.06},
//   {name: 'kirchheim_industrial_west', value: 0.11},
//   {name: 'kirchheim_residential', value: 0.05},
//   {name: 'unassigned_edges', value: 0.05}
// ],

import {
  RECEIVE_PREDICTION,
  REQUEST_PREDICTION,
  REQUEST_SIMULATION,
  SET_SIMULATION_PARAMETERS, START_SIMULATION
} from '../actions/actionTypes';

export function simulation(
  state = {
    isFetching: false,
    weatherScenario: 0,
    vehicleDistribution: [],
    srcWeights: {
      'aschheim_west': 0.1,
      'ebersberg_east': 0.37,
      'feldkirchen_west': 0.1,
      'heimstetten_industrial_1': 0.01,
      'heimstetten_industrial_2': 0.01,
      'heimstetten_residential': 0.18,
      'kirchheim_industrial_east': 0.01,
      'kirchheim_industrial_west': 0.01,
      'kirchheim_residential': 0.16,
      'unassigned_edges': 0.05
    },
    dstWeights: {
      'aschheim_west': 0.16,
      'ebersberg_east': 0.07,
      'feldkirchen_west': 0.16,
      'heimstetten_industrial_1': 0.14,
      'heimstetten_industrial_2': 0.14,
      'heimstetten_residential': 0.06,
      'kirchheim_industrial_east': 0.06,
      'kirchheim_industrial_west': 0.11,
      'kirchheim_residential': 0.05,
      'unassigned_edges': 0.05
    },
    vehicleNumber: 9500,
    timesteps: 10800
  }, action) {
  switch (action.type) {
    case REQUEST_SIMULATION:
      return Object.assign({}, state, {
        isFetching: true
      });
    case SET_SIMULATION_PARAMETERS:
      console.log(action);
      return Object.assign({}, state, {
        isFetching: false,
        weatherScenario: action.weatherScenario,
        vehicleDistribution: action.vehicleDistribution,
        srcWeights: action.srcWeights,
        dstWeights: action.dstWeights,
        vehicleNumber: action.vehicleNumber,
        timeSteps: action.timeSteps
      });
    case REQUEST_PREDICTION:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_PREDICTION:
      return Object.assign({}, state, {
        isFetching: false,
        prediction: action.prediction,
        lastUpdated: action.receivedAt
      });
    // case START_SIMULATION:
    //   return Object.assign({}, state, {
    //
    //   })
    default:
      return state;
  }
}