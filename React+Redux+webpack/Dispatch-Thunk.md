# Web development tools (Part 6)

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

## `Section: Front-end`(Thunk)

### `Summary`: In this documentation, we learn dispatch & Thunk.

### `Check Dependencies & Tools:`

- react
- tachyons
- axios
- redux
- react-redux
- redux-thunk
- redux-logger

------------------------------------------------------------

#### `本章背景：`
- :star: 本章在 6/25/2020 进行了大量修改，需要查看旧版本的可以查看以前的 commit 记录。
- 下面我们通过一张图来介绍 thunk 的工作原理：

<p align="center">
<img src="../assets/w23.png" width=90%>
</p>

- 本章最重要的几个观点：
  1. `actionCreator`实际上就是一个 return `object` 的 `fucntion`，`action`实际上就是一个 `object`，这是基础点。

  2. :star:`thunkMiddleware` 是一个使用在 `redux` 中的中间件，目的是为了将函数打包，简化 `component` 的代码，起锦上添花的作用。所以 `thunkMiddleware` 完全可以不使用，且只使用在 `redux` 中，`react` 用不到。

  3. Within our thunk function, we can perform all the side effects and AJAX we want. When we're done performing side effects, it is very likely that we will end up dispatching another action (or even another thunk), and the process repeats. __`(Important)`__

  4. 大胆想象，在一个 thunk 里面引用的 `dispatch` 的参数也是一个 `function` ，这就成为了嵌套的 `thunk` 。

### <span id="6.0">`Brief Contents & codes position`</span>

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

- [6.1 Dispatch an object / sync function.](#6.1)
- [6.2 How to make async action without thunk middleware?](#6.2)
- [6.3 Dispatch a function using thunk middleware.](#6.3)
- [6.4 My understanding.](#6.4)
- [6.5 More material.](#6.5)
- [6.6 Thunk 使用规范.](#6.6)

------------------------------------------------------------

### <span id="6.1">`Step1: Dispatch an object / sync function.`</span>

- #### Click here: [BACK TO CONTENT](#6.0)

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
1. 核心代码：
  ```jsx
  export const writeMessage = (inputContent) => {
      return {
          type: WRITE_MESSAGE,
          payload: inputContent,
      };
  }

  handleChange = (evt) => {
      store.dispatch(writeMessage(evt.target.value))
  }

  // ...
  onChange={this.handleChange}
  ```
2. 解说:

    1. 用户输入，引发 `onChange` 对应的函数 `handleChange`;
    2. `onChange` 引发时会产生一个变量，可以命名为 `evt` 或 `event`，这个变量自动注入 `handleChange` 需要的第一个参数中，输入的变量值为 `evt.target.value`。

    3. 执行：

    ```jsx
    store.dispatch(writeMessage(evt.target.value));
    ```

    4. 先执行：
    ```jsx
    writeMessage(evt.target.value);
    ```

    5. 实际得到：
    ```jsx
    store.dispatch({
      type: WRITE_MESSAGE,
      payload: evt.target.value,
    });
    ```
  
3. dispatch:

    1. 在这里，`dispatch` 的参数其实是一个 `object`，所以最原始的方法是不用定义 action，而是写成：

    ```jsx
    handleChange = (evt) => {
      store.dispatch({
        type: WRITE_MESSAGE,
        payload: evt.target.value,
      });
    }
    ```

    2. 由以上可知，`actionCreator`实际上就是一个生成 `object` 的 `fucntion`，`action`实际上就是一个 `object`。

    3. 当 `dispatch` 把 `object` 派送出去之后，`reducer`就自动接收这个`object`，然后改变对应的 `state`。
    
    4. :star: 6/25 补充：目前在没有 `thunkMiddleware`的情况下，dispatch 只能以 `object` 或者 `生成 object 的 sync 函数`作为参数。

### <span id="6.2">`Step2: How to make async action without thunk middleware？`</span>

- #### Click here: [BACK TO CONTENT](#6.0)

- Edition 2:
  1. Set up:

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

  2. Execute the async action by using `dispatch`.

    ```jsx
    import React, { Component } from 'react';
    import Message from './Message';
    import NewMessageEntry from './NewMessageEntry';
    import axios from 'axios';
    import store from '../store';
    import { gotMessagesFromServer } from '../store';

    export default class MessagesList extends Component {

      constructor() {
        super();
        this.state = store.getState();
      }

      componentDidMount() {
        axios.get('/api/messages')
          .then(res => res.data)
          .then(messages => store.dispatch(gotMessagesFromServer(messages)));

        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {

        const channelId = Number(this.props.match.params.channelId);
        const messages = this.state.messages;
        const filteredMessages = messages.filter(message => message.channelId === channelId);
        return (
          <div>
            <ul className="media-list">
              {filteredMessages.map(message => <Message message={message} key={message.id} />)}
            </ul>
            <NewMessageEntry channelId={channelId} />
          </div>
        );
      }
    }
    ```

#### `Comment:`
1. 核心代码：

    ```jsx
    componentDidMount() {
      axios.get('/api/messages')
        .then(res => res.data)
        .then(messages => store.dispatch(gotMessagesFromServer(messages)));

      this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }
    ```

2. 解说：
    1. 这里的原理就是把 dispatch 放在 promise 的最后端，当 async action 完成后把得到的结果打包成 `object` 派发出去。

    2. 这里说明就算不用 `middleware` ，也可以完成 `async action`，然后至于为什么引入`thunkMiddleware` 是因为想把 `component` 中的函数部分分离到独立文件，然后把所有的函数代码集中管理。

### <span id="6.3">`Step3: Dispatch a function using thunk middleware.`</span>

- #### Click here: [BACK TO CONTENT](#6.0)

- Import and apply the middleware.
  ```jsx
  import { createStore, applyMiddleware } from 'redux';
  import thunkMiddleware from 'redux-thunk';

  export default createStore(reducer, applyMiddleware(thunkMiddleware));
  ```

- Convert the old code.

  - Previous function:
  ```jsx
  componentDidMount() {
    axios.get('/api/messages')
      .then(res => res.data)
      .then(messages => store.dispatch(gotMessagesFromServer(messages)));

    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }
  ```

  - New function (Thunk):
  ```jsx
  import store from '../store';

  const gotNewMessageFromServer = (message) => {
    return {
        type: GOT_NEW_MESSAGE_FROM_SERVER,
        payload: message
    };
  }

  const fetchMessages = () => {
    return (dispatch) => {
        axios.get('/api/messages')
            .then(res => res.data)
            .then(messages => dispatch(gotMessagesFromServer(messages)));
    }
  }

  componentDidMount() {
    store.dispatch(fetchMessages());

    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }
  ```

#### `Comment:`
```diff
- componentDidMount() {
-    axios.get('/api/messages')
-     .then(res => res.data)
-      .then(messages => store.dispatch(gotMessagesFromServer(messages)));
-    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
- }

+ componentDidMount() {
+    store.dispatch(fetchMessages());
+    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
+ }
```
1. :star2: 主要变化是原来的 `dispatch` 只能以 `object` 为参数，引进 `thunkMiddleware` 之后 `dispatch` 可以是 `function` 。执行过程是如果 `dispatch` 的参数是 `function` 时，它会马上执行这个 `function` ，而由于这个函数是一个 `async function`，它会一直等着整个 `promise` 完成之后然后再调用 `dispatch` 结果（`object`）到 `reducer`。

2. 一个很重要的认识是，`thunkMiddleware` 是一个使用在 `redux` 中的中间件，目的是为了将函数打包，简化 `component` 的代码，起锦上添花的作用。所以 `thunkMiddleware` __完全可以不使用__，且只使用在 `redux` 中，`react` 用不到。

3. Thunk 的英文资料整理在 `step5`。

### <span id="6.4">`Step4: My understanding.`</span>

- #### Click here: [BACK TO CONTENT](#6.0)

1. 既然 `dispatch` 是用来派发 `actionCreator` 生成的对象，那么如果按照这个逻辑，如果我有一个 `async function` 返回一个对象，是不是可以通过直接 `dispatch` 这个对象从而完成任务，而不用使用 `thunk` 来实现？按照上面的想法，我写了这个：

    ```jsx
    export const fetchMessages1 = () => {
        axios.get('/api/messages')
            .then(res => res.data)
            .then(messages => {
                return {
                    action: GOT_MESSAGES_FROM_SERVER,
                    payload: messages,
                }
            });
    }
    ```

    对比：
    ```js
    const fetchMessages2 = () => {
      return (dispatch) => {
          axios.get('/api/messages')
              .then(res => res.data)
              .then(messages => dispatch(gotMessagesFromServer(messages)));
      }
    }
    ```

    判断运行以下代码的结果：
    ```js
    //编写理由：认为 fetchMessages1 会返回 object，可以省去 thunkMIddleware。

    dispatch(fetchMessages1());

    //认为 fetchMessages2 会返回 function，运行需要 thunkMIddleware。

    dispatch(fetchMessages2());
    ```

2. 上面结果的具体分析是:

  - :star2: 版本一：

    :bulb: 在没有 middleware 的情况下，dispatch 一个 sync fucntion，把它当作 sync function 操作，在 sync thread 中执行，得到 `object`。

    :bulb: 在没有 middleware 的情况下，dispatch 一个 async fucntion，把它当作 sync function 操作，在 sync thread 中执行，得到 `undefined`。

    :bulb: 有 middleware 的情况下，dispatch 一个 sync function，把它当作 sync function 操作，在 sync thread 中执行，得到 `object`。

    :bulb: 有 middleware 的情况下，dispatch 一个 async function，会把它当作一个 async function 操作，并在 async thread 中执行，得到 async action 运行结束。

  - :star2: 版本二（推荐）：
    1. 没有 middleware，dispatch 的参数，如果是 object，就派送 object;
    2. 没有 middleware，dispatch 的参数，如果是 functionA，就先在 sync 模式下运行 functionA，如果 functionA 返回 object，就派送 object;
    3. 没有 middleware，dispatch 的参数，如果是 functionA，就先在 sync 模式下运行 functionA，如果 functionA 是一个 async function，就派送 undefined;
    4. 没有 middleware，dispatch 的参数，如果是 functionA，就先在 sync 模式下运行 functionA，如果 functionA 返回 functionB，就派送 functionB;
    5. 有 middleware，dispatch 的参数，如果是 functionA，就先在 sync 模式下运行 functionA，如果 functionA 返回 functionB，无论 functionB 是 async 或者 sync 都运行 , 这时候 functionA 也叫做 `thunk`.

  - :key: 弄清楚第一和第二点很重要，需要弄清楚 sync 和 async 运行的知识基础:
    - [Part7 - Async & Promise](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/Async/Async-Promise.md) 

    - [Part8 - Async & Research (doc)](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/Async/Async-Research(doc).md)

    - [Part9 - Async & Research (code)](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/Async/Async-Research(code).md) 

3. dispatch （无 middleware） 使用的是同步动作，它必须马上返回一个现成的 object，显然作为 async 动作的 axio.get 跟普通的 sync 函数不一样，promise 函数的 callback 是放在 event loop 中等所有 sync 函数完成之后才按序执行，所以是无法马上提供值。

4. 没有加入 thunkMiddleware 时，一开始的 dispatch 是用来派发 sync 执行模式下得到的或者现成的 object;因为 async operation 的运作使 dispatch 无法马上得到并派发 object ，而需要把 dispatch 放在 async operation 过程中（比如 promise 链）才能实现派发 object，:key:`没有 thunkMiddleware 使处理方法就是把 dispatch 放在 promise 链末端。`

5. 加入 thunkMiddleware 后，调用时 dispatch 就可以放在函数头部，形式是 `dispatch(thunk)`，下面是 thunk 的例子

    ```js
    const fetchMessages = () => {
      return (dispatch) => {
          axios.get('/api/messages')
              .then(res => res.data)
              .then(messages => dispatch(gotMessagesFromServer(messages)));
      }
    }
    ```

    2. 另外一种写法，使用 async/await，需要注明的是，这也是在使用 promise，不过表现形式不一样。

    ```js
    export const fetchMessages = () => {
        return async (dispatch) => {
            const res = await axios.get('/api/messages');
            const messages = res.data;
            dispatch(gotMessagesFromServer(messages));
        }
    }
    ```

5. 最后再强调一下，thunk 的作用是将程序的函数部分跟 html 部分分割，让整起来看起来更容易维护。`但是没有使用 thunk 是完全没有问题的，一点也不会影响功能实现。`

6. :star::star::star: 6/25/2020:
  - dispatch an object: 派发一个 object 到 reducer。
  - dispatch a function（典型例子：thunkMiddleware + async + dispatch 为参数）:运行 function。

  :star: thunk的解释：本质是一个 function，进一步解释是一个会返回函数的函数，这个子函数是以 dispatch 为参数的 async 函数。如下函数 `fetchMessages` 就是一个 thunk:

  ```js
  const fetchMessages = () => {
    return (dispatch) => {
        axios.get('/api/messages')
            .then(res => res.data)
            .then(messages => dispatch(gotMessagesFromServer(messages)));
    }
  }
  ```

### <span id="6.5">`Step5: More materials.`</span>

- #### Click here: [BACK TO CONTENT](#6.0)

1. With thunkMiddleware, whenever we use store.dispatch, it will be a three-step process:

    1. The store checks to see if the thing we passed to `dispatch` is a regular object or a function. 
      a. If it's a function, the store invokes that function immediately and passes the `dispatch` and `getState` methods to it as arguments. Do not move on to step 2.
      b. If it's a regular object, move on to step 2.
    2. The store invokes our reducer with the action and the previous state, and sets the return value 
      as the new state.
    3. The store invokes all listeners that have been registered with it (via `store.subscribe`).

2. Before, our reducer expected an action to be a plain JavaScript object with some identifying type field. However, thunk middleware will give us a powerful new ability: instead of dispatching an action object, we can dispatch a function! When thunkMiddleware sees that we've dispatched a function instead of a regular object, it will say,

    1. Hey! This isn't a regular action! It's a function! I can't give this to the reducer, `so instead I'll invoke it and pass the store's dispatch method to it, so that whenever that side effect completes or the async action resolves, they can use it to dispatch a new action with whatever data they get.` (这句很重要，middlware 里面继续处理 async function，外面依然处理同步函数！)

3. `Thunk`: a function that we can pass to "store.dispatch" if we configure our store with "thunkMiddleware". If we dispatch a thunk, the thunk middleware will invoke the function and pass the store's "dispatch" and "getState" methods to it. Thunks are a desirable place to perform side effects (like AJAX requests) because it de-clutters our components, and because `they make it easy to eventually dispatch other actions when some asynchronous behavior resolves.`(这句很重要！)

4. Within our thunk function, we can perform all the side effects and AJAX we want. When we're done performing side effects, it is very likely that we will end up dispatching another action (or even another thunk), and the process repeats.

### <span id="6.6">`Step6: Thunk 使用规范.`</span>

- #### Click here: [BACK TO CONTENT](#6.0)

:white_check_mark:以下为部分关键代码，详细查看 __代码来源: `robot-friends-pwa (Testing part demo app.)`__
1. 引入 thunkMIddleware
```js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
const rootReducers = combineReducers({<YOUR REDUCERS>});
const store = createStore(rootReducers, applyMiddleware(thunkMiddleware))
```

2. 定义 action
```js
import { apiCall } from './api/api'
import {
  CHANGE_SEARCHFIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED
} from './constants'

// sync action
export const setSearchField = (text) => ({ type: CHANGE_SEARCHFIELD, payload: text })

// async action
export const requestRobots = () => (dispatch) => {
  dispatch({ type: REQUEST_ROBOTS_PENDING })
  apiCall('https://jsonplaceholder.typicode.com/users')
    .then(data => dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_ROBOTS_FAILED, payload: error }))
}
```

3. Connect the actions to component.
```js
const mapDispatchToProps = (dispatch) => {
  return {
    // dispatch a sync action
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    // dispatch an async action
    onRequestRobots: () => dispatch(requestRobots())
  }
}

class App extends Component {
  render() {
    return <Mainpage {...this.props} />
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
```

4. 在 component 中调用 action。

```js
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import Header from '../components/Header';

import './Mainpage.css';

class Mainpage extends Component {
    componentDidMount() {
        this.props.onRequestRobots();
    }

    filterRobots = () => {
        return this.props.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.props.searchField.toLowerCase());
        })
    }

    render() {
        const { robots, onSearchChange, isPending } = this.props;
        return (
            <div className='tc'>
                <Header />
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    {
                        isPending ? <h1>Loading</h1> :
                        <ErrorBoundry>
                            <CardList robots={this.filterRobots()} />
                        </ErrorBoundry>
                    }
                </Scroll>
            </div>
        );
    }
}
```

- #### Click here: [BACK TO CONTENT](#6.0)
- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)