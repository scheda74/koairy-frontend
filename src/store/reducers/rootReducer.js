import { combineReducers } from 'redux';
import { traffic } from './trafficReducers';
import { air } from './hawaDawaReducer';
import { prediction } from './predictionReducer';

const rootReducer = combineReducers({
  traffic,
  air,
  prediction
});

export default rootReducer;