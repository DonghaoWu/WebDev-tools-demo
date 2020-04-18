redux

react -> render cycle
redux -> improve state management

webpack -> 

- good for managing large state.
- Useful for sharing data between containers
- Predictable state management using the 3 principles

1. Single source of turth
2. State is read only
3. Changes using pure functions.

action => reducer => store => make changes

flex pattern

action -> dispatcher -> store -> view

```bash
$ npm i redux 
$ npm i react-redux
$ npm i react-redux
```

constants.js
```jsx
const CHANGE_SEARCH_FIELD = 'CHANGE_SEARCH_FIELD';
```

action.js
```jsx
import { CHANGE_SEARCH_FIELD } from './constants.js'
export const setSearchField = (text) =>{
    type: CHANGE_SEARCH_FIELD,
    payload: text
}
```

reducer.js

```jsx
import { CHANGE_SEARCH_FIELD } from './constants.js'
const initialState = {
    searchField:'',
}


export const searchRobots = (state = initialState, action = {}) => {
    switch(action.type){
        case CHANGE_SEARCH_FIELD:
            return {...state, {searchField: action.payload}};
        default:
            return state;
    }
}
```

- connect reducer to react

```jsx
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { searchRobots } from './reducers';

const store = createStore(searchRobots);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
```

```jsx
import {setSearchField} from '../actions';
import { connect } from 'react-redux';

const mapStateToprops = state => {
    return{
        searchField: state.searchRobots.searchField
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}

render(){
    const { searchField } = {this.props}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
```

- redux middleware, data flow smoothly.

- Redux Dev-tool
```bash
$ npm i redux-logger
```

```jsx
import {applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';

const logger = createLogger();
const store = createStore(searchRobots, applyMiddleware(logger));
```


- Redux Async actions

make action async

```bash
$ npm install redux-thunk
```


```jsx
import thunkMiddleware from 'redux-thunk';

const store = createStore(searchRobots, applyMiddleware(logger, thunkMiddleware));
```

```jsx
export const REQUEST_ROBOTS_PENGING = 'REQUEST_ROBOTS_PENGING';
export const REQUEST_ROBOTS_SUCCESS = 'REQUEST_ROBOTS_SUCCESS';
export const REQUEST_ROBOTS_FAILED = 'REQUEST_ROBOTS_FAILED';
```

```jsx
import {
    CHANGE_SEARCH_FIELD,
    REQUEST_ROBOTS_PENGING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED,
} from './constants.js'
const initialState = {
    searchField: '',
}


export const searchRobots = (state = initialState, action = {}) => {
    switch (action.type) {
        case CHANGE_SEARCH_FIELD:
            return { ...state, { searchField: action.payload }
    };
        default:
            return state;
    }
}

export const requestRobots = (dispatch) =>{
    dispatch({type: REQUEST_ROBOTS_PENGING});
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => dispatch({type: REQUEST_ROBOTS_SUCCESS, payload: data}))
      .catch(error => dispatch({type: REQUEST_ROBOTS_FAILED, payload: error}))
}
```


问题，有了 thunkMiddleware 是不是可以代替 async？

```jsx
const initialStateRobots ={
    isPending:false,
    robots:[],
    error: '',
}
export const requestRobots = (state = initialStateRobots, action = {}) =>{
    switch(action.type){
        case REQUEST_ROBOTS_PENGING:
            return {...state, {isPending: true}}
        case REQUEST_ROBOTS_SUCCESS:
            return {...state, {robots: action.payload, isPending:false}}
        case REQUEST_ROBOTS_FAILED:
            return {...state, {error: action.payload, isPending:false}}
        default:
            return state;
    }
}
```

```jsx
import {requestRobots} from './reducers';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({searchRobots, requestRobots});


```

目前所知。redux-thunk是用来派发 异步函数的，正常的 dispatch 是用来派发同步函数或者 object 的。 后续会更新，这个应该是 这一部分最重要的知识点了。

- library

react-router
ramda
lodash
glamorous
styled components
css-modules
gatsby
next.js
material-UI
semantic-ui
reselect
redux-saga
immutable

- module bundlers

parcel
webpack
rollup.js

```bash
$ 
```

webpack
Bable
Eslint