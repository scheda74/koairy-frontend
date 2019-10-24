import { combineReducers } from 'redux';
import { statistics } from './statisticsReducer';
import { emissions } from './emissionReducer';
import { traffic } from './trafficReducers';

const rootReducer = combineReducers({
  emissions,
  traffic,
  statistics
});

export default rootReducer;