import { combineReducers } from 'redux';
import { statistics } from './statisticsReducer';
import { emissions } from './emissionReducer';
import { traffic } from './trafficReducers';
import { simulation } from './simulationReducers';
import { air } from './hawaDawaReducer';

const rootReducer = combineReducers({
  emissions,
  traffic,
  simulation,
  statistics,
  air
});

export default rootReducer;