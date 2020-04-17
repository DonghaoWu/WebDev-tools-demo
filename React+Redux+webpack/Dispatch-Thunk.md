# Web development tools (Part 6)

## `Section: Front-end`(Thunk)

### `Summary`: In this documentation, we learn dispatch & Thunk.

### `Check Dependencies:`

- react
- tachyons
- axios
- redux
- react-redux
- redux-thunk
- redux-logger

------------------------------------------------------------

#### `本章背景：`
- 本章主要介绍如何使用 dispatch & Thunk:

    - 下面我们通过一张图来介绍 thunk 的工作原理：

<p align="center">
<img src="../assets/w23.png" width=90%>
</p>


### `Brief Contents & codes position`
- 6.1 How to use `dispatch`?
- 6.2 How to make async action without thunk middleware.
- 6.3 How to set up thunk middleware?

------------------------------------------------------------

### `Step1: How to use `dispatch`?`

- Edition 1:
  1. Set up:

  ```js
  import { createStore } from 'redux';

  const WRITE_MESSAGE = 'WRITE_MESSAGE';

  export const writeMessage = (inputContent) => {
      return {
          type: WRITE_MESSAGE,
          payload: inputContent,
      };
  }

  const initialState = {
      newMessageEntry: '',
  }

  const reducer = (state = initialState, action) => {
    switch (action.type) {
        case WRITE_MESSAGE:
            return { ...state, newMessageEntry: action.payload };
        default:
            return state;
    }
  }

  export default createStore(reducer);
  ```

  2. Execute the action by using `dispatch`

    ```js
    import React, { Component } from 'react';
    import store from '../store';
    import { writeMessage, postMessage } from '../store';
    import axios from 'axios';
    import socket from '../socket'


    export default class NewMessageEntry extends Component {
      constructor() {
        super();
        this.state = store.getState();
      }

      componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      handleChange = (evt) => {
        store.dispatch(writeMessage(evt.target.value))
      }

      handleSubmit = (evt) => {
        event.preventDefault();
        const content = this.state.newMessageEntry;
        const channelId = this.props.channelId;

        store.dispatch(postMessage(content, channelId, this.state.nameEntry))
      }

      render() {
        return (
          <form id="new-message-form" onSubmit={this.handleSubmit}>
            <div className="input-group input-group-lg">
              <input
                className="form-control"
                type="text"
                name="content"
                placeholder="Say something nice..."
                value={this.state.newMessageEntry}
                onChange={this.handleChange}
              />
              <span className="input-group-btn">
                <button className="btn btn-default" type="submit">Chat!</button>
              </span>
            </div>
          </form>
        );
      }
    }
    ```

#### `Comment:`
1. 数据流动过程：
```jsx
      handleChange = (evt) => {
        store.dispatch(writeMessage(evt.target.value))
      }

      // ...
      onChange={this.handleChange}
```
2. 解说：
  - 用户输入，引发 `onChange` 对应的函数 `handleChange`;
  - `onChange` 引发时会产生一个变量，可以命名为 `evt` 或 `event`，这个变量自动注入 `handleChange` 需要的第一个参数中，输入的变量值为 `evt.target.value`。

  - 执行：
    ```jsx
    store.dispatch(writeMessage(evt.target.value));
    ```
    先执行：
    ```jsx
    writeMessage(evt.target.value);
    ```
    得到：
    ```jsx
    store.dispatch({
      type: WRITE_MESSAGE,
      payload: evt.target.value,
    });
    ```
  
3. dispatch:
  - 在这里，`dispatch` 的参数其实是一个 `object`，所以最原始的方法是不用定义 action，而是写成：
  ```jsx
  handleChange = (evt) => {
    store.dispatch({
      type: WRITE_MESSAGE,
      payload: evt.target.value,
    });
  }
  ```

  - 由以上可知，`actionCreator`实际上就是一个生成 `object` 的 `fucntion`，`action`实际上就是一个 `object`，这个认识很重要。

  - 当 `dispatch` 把 `object` 派送出去之后，`reducer`就自动接受这个`object`，然后改变对应的 `state`。

### `Step2: How to make async action without thunk middleware？`


  ```js
  import { createStore } from 'redux';

  const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';

  export const gotMessagesFromServer = (messages) => {
      return {
          type: GOT_MESSAGES_FROM_SERVER,
          payload: messages,
      }
  }

  const initialState = {
    messages: []
  }

  const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GOT_MESSAGES_FROM_SERVER:
            return { ...state, messages: [...action.payload] };
        default:
            return state;
    }
  }
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

- 主要代码：
```jsx
import { connect } from 'react-redux';
import { setSearchField, requestRobots } from '../actions';

class App extends Component {
  // ...
  
  componentDidMount() {
    this.props.onRequestRobots();
  }

  render() {
    const { robots, searchField, onSearchChange, isPending } = this.props;
    // ...
  }
}

const mapStateToProps = (state) => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
```

#### `Comment:`
1. 之前有种写法：

    ```jsx
    export default connect(mapStateToProps, { setSearchField, requestRobots})(App);
    ```
    - 在这里出现了错误，具体原因后面分析。

2. 连接 component 的几大要素：

    - action functions
    - mapStateToProps
    - mapDispatchToProps
    - connect


### `Step5: Create redux async fucntion.`

- 下面具体来分析 `dispatch` 的使用。

- 例子一：dispatch 同步函数。

```jsx
// 定义一个同步函数，作为一个 action ，返回一个 object。
const setSearchField = (text) => ({ type: CHANGE_SEARCHFIELD, payload: text });

// onSearchChange 是一个函数，它的运作顺序是接收变量，执行 setSearchField 后返回一个 object，最后调用 dispatch 进行派发 object。
const mapDispatchToProps = (dispatch) => {
  return {
          onSearchChange: (event) => dispatch(setSearchField(event.target.value))
  }
}

// 父组件的函数向下传递
<SearchBox searchChange={this.props.onSearchChange} />

// 在这里有点特殊，当用户输入时，onChange 触发，同时 searchChange 触发，同时自动捕捉输入时产生的 event 变量并自动放到 searchChange 中作为变量。
const SearchBox = ({ searchfield, searchChange }) => {
  return (
    <div className='pa2'>
      <input
        className='pa3 ba b--green bg-lightest-blue'
        type='search'
        placeholder='search robots'
        onChange={searchChange}
      />
    </div>
  );
}
```

#### `Comment:`
1. 运行顺序：
    - 用户输入
    - onChange(event)
    - searchChange(event)
    - onSearchChange(event)
    - setSearchField(event.target.value) 获得一个 `object`
    - dispatch({ object })
    - reducer: searchRobots

- 例子二：dispatch 异步函数。

```jsx
// 定义一个函数，作为一个 action ，返回一个 function。
export const requestRobots = () => {
  return fucntion(dispatch){
    dispatch({ type: REQUEST_ROBOTS_PENDING })
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(data => dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data }))
      .catch(error => dispatch({ type: REQUEST_ROBOTS_FAILED, payload: error }))
  }
}

// onRequestRobots 是一个函数，跟上一个例子不一样，这里是执行了 requestRobots 之后返回一个函数，上一个例子执行了函数之后返回一个对象。
//这是第一个最大的不同，当返回的是一个 object 时是不用到 thunkMiddleware 的，只有返回函数的时候，才需要用到这个中间件。
const mapDispatchToProps = (dispatch) => {
  return {
    onRequestRobots: () => dispatch(requestRobots())
  }
}

componentDidMount() {
    this.props.onRequestRobots();
}
```

#### `Comment:`
1. 运行顺序：
    - componentDidMount();
    - onReduestRobots(); 
    - requestRobots(); 获得一个函数。
    - dispatch 一个函数。相当于：

    ```jsx
        dispatch(function (dispatch) {
            dispatch({ type: REQUEST_ROBOTS_PENDING })
            fetch('https://jsonplaceholder.typicode.com/users')
                .then(data => dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data }))
                .catch(error => dispatch({ type: REQUEST_ROBOTS_FAILED, payload: error }))
            }
        )
    ```

    - 这是一个奇怪的组合。
    - 在 thunkMiddleware 和 dispatch 的作用下，运行从 requestRobots 得到的函数，而这个函数是一个同步函数接着异步函数，而同步函数和异步函数都有另外一个 `dispatch`去派发 `object`。
    - 很多资料都说 thunkMiddleware 是针对 `dispatch 异步函数`，为什么不能用于同步函数，或者说这里面是怎么运作的，后面需要继续学习。
    - 个人想法，异步函数是有副作用的，在这里我想 thunkMiddleware 的作用就是可以等这个异步函数完全执行之后再跳出来。
    - redux-thunk主要的功能就是可以让我们dispatch一个函数，而不只是普通的 Object。
    - 我们创建的 action 函数最终都返回的是对象，是因为 store 只能接受 action 对象，但是如果涉及到有请求发送的时候返回对象就不容易操作，有没有什么方法能否返回一个函数，在函数里面进行请求呢？——有的！！redux 的中间件 redux-thunk!

- 下面我们通过一张图来介绍 thunk 的工作原理：

<p align="center">
<img src="../assets/w23.png" width=90%>
</p>

- 关于更详细的 thunk 原理：
