import { requestRobotsReducer, searchRobotsReducer } from './reducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ requestRobotsReducer, searchRobotsReducer });

export default rootReducer;