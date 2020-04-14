# Web development tools (Part 5)

## `Section: Front-end`(Redux)

### `Summary`: In this documentation, we learn Redux.js.

### `Check Dependencies:`

- react
- tachyons
- axios

```diff
+ redux
+ react-redux
+ redux-thunk
+ redux-logger
```

------------------------------------------------------------

#### `本章背景：`
- 本章主要介绍如何使用 redux：

- redux 的 八大要素：
    - store
    - rootReducer
    - Provider
    - constants.js 或者 type.js
    - actions
    - reducers
    - connect
    - dispatch

------------------------------------------------------------

### `Brief Contents & codes position`
- 5.1 Install the dependencies.
- 5.2 Set up store, combineReducers and redx-middleware.
- 5.3 Set up types, actions, reducers.
- 5.4 Connect state and method to components and use the props and methods.
- 5.5 Create redux async fucntion.

------------------------------------------------------------

### `Step1: Install the dependencies.`

```bash
$ npm i redux
$ npm i react-redux
$ npm i redux-logger
$ npm i redux-thunk
```

#### `Comment:`
1. 

### `Step2: Set up store, combineReducers and redux-middleware.`

- store and redux-middleware

__`Location: ./robotfriends-redux/src/store.js`__

```jsx
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './rootReducer';

const logger = createLogger()

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger))

export default store;
```

- rootReducer
__`Location: ./robotfriends-redux/src/rootReducer.js`__

```jsx
import { requestRobots, searchRobots } from './reducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ requestRobots, searchRobots });

export default rootReducer;
```

- Apply redux to application.
__`Location: ./robotfriends-redux/src/index.js`__

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import 'tachyons';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './store'
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
```

#### `Comment:`
1. 

### `Step3: Set up types, actions, reducers.`

- TYPES
__`Location: ./robotfriends-redux/src/constants.js`__

```jsx
export const CHANGE_SEARCHFIELD = 'CHANGE_SEARCHFIELD';

export const REQUEST_ROBOTS_PENDING = 'REQUEST_ROBOTS_PENDING';
export const REQUEST_ROBOTS_SUCCESS = 'REQUEST_ROBOTS_SUCCESS';
export const REQUEST_ROBOTS_FAILED = 'REQUEST_ROBOTS_FAILED';
```

- ACTIONS
__`Location: ./robotfriends-redux/src/actions.js`__

```jsx
import { apiCall } from './api/api'
import {
  CHANGE_SEARCHFIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED
 } from './constants'


export const setSearchField = (text) => ({ type: CHANGE_SEARCHFIELD, payload: text })

export const requestRobots = () => (dispatch) => {
  dispatch({ type: REQUEST_ROBOTS_PENDING })
  apiCall('https://jsonplaceholder.typicode.com/users')
    .then(data => dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_ROBOTS_FAILED, payload: error }))
}
```

#### `Comment:`
1. 在这里需要说明一个事情，第一个函数 `setSearchField` 实际是一个返回 `Object` 的函数，所以在后面调用的时候直接使用 `dispatch` 就可以将 `Object` 派发到对应的 `reducer` 中。这里的函数相当于是一个 `同步函数`。可以实际调用中认为 `dispatch` 是用来派发 `Object` 的。

2. 第二个函数 `requestRobots` 是一个异步函数，定义的方式也不一样，这个在后面会有详细分析。

- sub reducers
__`Location: ./robotfriends-redux/src/actions.js`__

```jsx
import {
  CHANGE_SEARCHFIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED
} from './constants';

const initialStateSearch = {
  searchField: ''
}

export const searchRobots = (state = initialStateSearch, action = {}) => {
  switch (action.type) {
    case CHANGE_SEARCHFIELD:
      return { ...state, searchField: action.payload }
    default:
      return state
  }
}

const initialStateRobots = {
  robots: [],
  isPending: true,
  error: '',
}

export const requestRobots = (state = initialStateRobots, action = {}) => {
  switch (action.type) {
    case REQUEST_ROBOTS_PENDING:
      return { ...state, isPending: true }
    case REQUEST_ROBOTS_SUCCESS:
      return { ...state, robots: action.payload, isPending: false }
    case REQUEST_ROBOTS_FAILED:
      return { ...state, error: action.payload }
    default:
      return state
  }
}
```

### `Step4: Connect state and method to components and use the props and methods.`


#### `Comment:`
1. 

### `Step5: Create redux async fucntion.`


#### `Comment:`
1. 

