import { combineReducers } from 'redux';
import { statistics } from './statisticsReducer';
import { emissions } from './emissionReducer';
import { traffic } from './trafficReducers';
import { simulation } from './simulationReducers';
import { air } from './hawaDawaReducer';
import { prediction } from './predictionReducer';

const rootReducer = combineReducers({
  emissions,
  traffic,
  simulation,
  statistics,
  air,
  prediction
});

export default rootReducer;