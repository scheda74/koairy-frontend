import {
  INVALIDATE_PREDICTION,
  RECEIVE_PREDICTION,
  RECEIVE_SINGLE_PREDICTION,
  REQUEST_PREDICTION,
  SET_SIMULATION_PARAMETERS,
  SET_SINGLE_SIMULATION_PARAMETERS
} from '../actions/actionTypes';

export function prediction(
  state = {
    isFetching: false,
    didInvalidate: false
  }, action) {
  switch (action.type) {
    case SET_SIMULATION_PARAMETERS:
      console.log(action);
      return Object.assign({}, state, {
        isFetching: false,
        // weatherScenario: action.weatherScenario,
        inputKeys: action.inputKeys,
        vehicleDistribution: action.vehicleDistribution,
        srcWeights: action.srcWeights,
        dstWeights: action.dstWeights,
        vehicleNumber: action.vehicleNumber,
        timeSteps: action.timeSteps,
        predictionModel: action.predictionModel,
        startDate: action.startDate,
        endDate: action.endDate,
        startHour: action.startHour,
        endHour: action.endHour,
        outputKeys: action.outputKeys,
        boxID: action.boxID
      });
    case SET_SINGLE_SIMULATION_PARAMETERS:
      console.log(action);
      return Object.assign({}, state, {
        isFetching: false,
        [action.boxID]: {
          // weatherScenario: action.weatherScenario,
          vehicleDistribution: action.vehicleDistribution,
          vehicleNumber: action.vehicleNumber,
          timeSteps: action.timeSteps,
          predictionModel: action.predictionModel,
          startDate: action.startDate,
          endDate: action.endDate,
          startHour: action.startHour,
          endHour: action.endHour,
          outputKeys: action.outputKeys
        }
      });
    case REQUEST_PREDICTION:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_PREDICTION:
      return Object.assign({}, state, {
        isFetching: false,
        full: action.prediction,
        lastUpdated: action.receivedAt
      });
    case RECEIVE_SINGLE_PREDICTION:
      console.log('prediction received: ', action)
      return Object.assign({}, state, {
        isFetching: false,
        [action.boxID]: action.prediction,
        // single: action.prediction,
        lastUpdated: action.receivedAt
      });
    case INVALIDATE_PREDICTION:
      console.log('something went wrong: ', action);
      return Object.assign({}, state, {
        didInvalidate: true,
        isFetching: false
      });
    default:
      return state;
  }
}