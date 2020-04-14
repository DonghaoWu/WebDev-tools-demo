import { requestRobots, searchRobots } from './reducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ requestRobots, searchRobots });

export default rootReducer;