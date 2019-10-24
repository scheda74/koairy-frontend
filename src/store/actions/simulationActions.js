import { SET_SIMULATION_PARAMETERS } from './actionTypes';


export function setSimulationParameter(params) {
  return {
    type: SET_SIMULATION_PARAMETERS,
    weatherScenario: params.weatherScenario,
    vehicleDistribution: params.vehicleDistribution,
    srcWeights: params.srcWeights,
    dstWeights: params.dstWeights,
    vehicleNumber: params.vehicleNumber
  }
}