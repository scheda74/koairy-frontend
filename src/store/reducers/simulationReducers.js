
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
  REQUEST_SIMULATION,
  SET_SIMULATION_PARAMETERS
} from '../actions/actionTypes';

export function simulation(
  state = {
    isFetching: false,
    weatherScenario: 0,
    vehicleDistribution: [],
    srcWeights: [
      {name: 'aschheim_west', value: 0.1},
      {name: 'ebersberg_east', value: 0.37},
      {name: 'feldkirchen_west', value: 0.1},
      {name: 'heimstetten_industrial_1', value: 0.01},
      {name: 'heimstetten_industrial_2', value: 0.01},
      {name: 'heimstetten_residential', value: 0.18},
      {name: 'kirchheim_industrial_east', value: 0.01},
      {name: 'kirchheim_industrial_west', value: 0.01},
      {name: 'kirchheim_residential', value: 0.16},
      {name: 'unassigned_edges', value: 0.05}
    ],
    dstWeights: [
      {name: 'aschheim_west', value: 0.16},
      {name: 'ebersberg_east', value: 0.07},
      {name: 'feldkirchen_west', value: 0.16},
      {name: 'heimstetten_industrial_1', value: 0.14},
      {name: 'heimstetten_industrial_2', value: 0.14},
      {name: 'heimstetten_residential', value: 0.06},
      {name: 'kirchheim_industrial_east', value: 0.06},
      {name: 'kirchheim_industrial_west', value: 0.11},
      {name: 'kirchheim_residential', value: 0.05},
      {name: 'unassigned_edges', value: 0.05}
    ],
    vehicleNumber: 9500
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
        vehicleNumber: action.vehicleNumber
      });
    default:
      return state;
  }
}