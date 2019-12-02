import {
  RECEIVE_PREDICTION,
  RECEIVE_SINGLE_PREDICTION,
  REQUEST_PREDICTION,
  REQUEST_SIMULATION,
  SET_SIMULATION_PARAMETERS,
  SET_SINGLE_SIMULATION_PARAMETERS
} from '../actions/actionTypes';

export function simulation(
  state = {
    vehicleDistribution: {
      "HBEFA3/PC_D_EU2": 0.007,
      "HBEFA3/PC_D_EU3": 0.0251,
      "HBEFA3/PC_D_EU4": 0.0934,
      "HBEFA3/PC_D_EU5": 0.089,
      "HBEFA3/PC_D_EU6": 0.1,
      "HBEFA3/PC_G_EU2": 0.0764,
      "HBEFA3/PC_G_EU3": 0.0342,
      "HBEFA3/PC_G_EU4": 0.1907,
      "HBEFA3/PC_G_EU5": 0.1802,
      "HBEFA3/PC_G_EU6": 0.163,
      "HBEFA3/PC_Alternative": 0.02
    },
    isFetching: false,
    // weatherScenario: 0,
    predictionModel: 'lstm',
    startDate: '2019-08-01',
    endDate: '2019-11-10',
    startHour: '0:00',
    endHour: '23:00',
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
        // weatherScenario: action.weatherScenario,
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
        output_key: action.output_key,
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
          output_key: action.output_key
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
        prediction: action.prediction,
        lastUpdated: action.receivedAt
      });

    case RECEIVE_SINGLE_PREDICTION:
      return Object.assign({}, state, {
        isFetching: false,
        singlePrediction: {...state.simulation.prediction, [action.boxID]: action.prediction},
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}