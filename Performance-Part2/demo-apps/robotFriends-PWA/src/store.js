import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import rootReducer from './rootReducer';

// const logger = createLogger();

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store;


