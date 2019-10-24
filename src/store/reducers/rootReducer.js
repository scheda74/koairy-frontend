import { combineReducers } from 'redux';
import { statistics } from './statisticsReducer';
import { emissions } from './emissionReducer';
import { traffic } from './trafficReducers';
import { simulation } from './simulationReducers';

const rootReducer = combineReducers({
  emissions,
  traffic,
  simulation,
  statistics
});

export default rootReducer;