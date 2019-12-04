import { combineReducers } from 'redux';
import { statistics } from './statisticsReducer';
import { emissions } from './emissionReducer';
import { traffic } from './trafficReducers';
import { simulation } from './simulationReducers';
import { air } from './hawaDawaReducer';
import { prediction } from './predictionReducer';

import { TRIGGER_TOOLBAR } from '../actions/actionTypes';

export function triggerToolbar(trigger) {
  console.log('toolbar triggered', trigger)
  return {
    type: TRIGGER_TOOLBAR,
    isTriggered: trigger
  }
}

function isToolbarActive(state = false, action) {
  switch (action.type) {
    case TRIGGER_TOOLBAR:
      return action.isTriggered;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  emissions,
  traffic,
  simulation,
  statistics,
  air,
  prediction,
  isToolbarActive
});

export default rootReducer;