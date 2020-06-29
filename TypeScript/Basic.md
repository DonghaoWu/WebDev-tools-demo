# Web development tools (Part 16)

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

## `Section: TypeScript` (Part 1: Basic)

### `Summary`: In this documentation, we learn basic TypeScript.

### `Check Dependencies & Tools:`

- typescript

------------------------------------------------------------

#### `本章背景：`
- __参考材料 ：[https://www.typescriptlang.org/](https://www.typescriptlang.org/)__

- TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.

- 本章分两部分，分别是：
    1. Basic :white_check_mark:
    2. App

------------------------------------------------------------

### <span id="16.0">`Brief Contents & codes position`</span>

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

- [16.1 Install dependency and configure.](#16.1)
- [16.2 Compile a ts file.](#16.2)
- [16.3 Basic data types.](#16.3)
- [16.4 Advanced data types.](#16.4)

------------------------------------------------------------

### <span id="16.1">`Step1: Install dependency and configure.`</span>

- #### Click here: [BACK TO CONTENT](#16.0)

1. Install dependency.

```bash
$ node -v  # check node version
$ sudo npm i -g typescript
$ tsc # check if installed correctly
```
----------------------------------------------------------------------------

#### `Comment:`
1. 


### <span id="16.2">`Step2: Compile a ts file.`</span>

- #### Click here: [BACK TO CONTENT](#16.0)

1. Simple function in ts file

    __`Location: ./demo-app/basic/ty-demo.ts`__

```js
export { };

const func1 = (a: number, b: number) => {
    return a + b;
}

console.log(func1(1, 2));
```

----------------------------------------------------------------------------

2. Compile the ts file.

```bash
$ tsc ty-demo.ts
```

3. Get a new js file in the same directory.

    __`Location: ./demo-app/basic/ty-demo.js`__

```js
"use strict";
exports.__esModule = true;
var func1 = function (a, b) {
    return a + b;
};
console.log(func1(1, 2));
```

4. Configuration, get a new file: tsconfig.json

```bash
$ tsc --init
```

- __`Location: ./demo-app/basic/tsconfig.json`__

- 在 compilerOptions 下可以修改一些设置。

5. 自动侦查修改并编译模式：

```bash
$ tsc ty-demo.ts --watch
```

#### `Comment:`
1. 从上可知，TypeScript 的作用是在 ts 文件中先对一些变量进行数据类型设定，然后再执行编译程序转化成 js 文件。

2. 在这里提一个问题，编译好的 js 文件没有对 ts 中设定的数据类型敏感，所以 TypeScript 在这里的作用是什么，作为编译前的检测器，对编译行为进行规范并减少 bugs？


### <span id="16.3">`Step3: Sync action testing.`</span>

- #### Click here: [BACK TO CONTENT](#16.0)

1. Install dependecy:
```bash
$ npm i redux-mock-store --save-dev
```

2. Configure.
```js
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const mockStore = configureMockStore([thunkMiddleware]);
```

3. 被测试的 sync action。

```js
// sync action
export const setSearchField = (text) => ({ type: CHANGE_SEARCHFIELD, payload: text })
```

4. Sync action testing.

__`Location: ./src/actions.test.js`__

```js
// Sync action testing.
it('should create an action to search robots', () => {
    const text = 'wooo';
    const expectedAction = {
        type: CHANGE_SEARCHFIELD,
        payload: text
    }
    expect(actions.setSearchField(text)).toEqual(expectedAction)
})
```
----------------------------------------------------------------------------

#### `Comment:`
1. 


### <span id="16.4">`Step4: Async action testing.`</span>

- #### Click here: [BACK TO CONTENT](#16.0)

1. Install dependecy:
```bash
$ npm i fetch-mock --save-dev
```

2. Configure.
```js
import fetchMock from 'fetch-mock'
```

3. 被测试的 async action。

```js
export const requestRobots = () => (dispatch) => {
  dispatch({ type: REQUEST_ROBOTS_PENDING })
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data => dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_ROBOTS_FAILED, payload: error }))
}
```

4. Async action testing.

```js
// Async action testing without fetch.
it('should handles requesting robots API', () => {
    const store = mockStore();
    store.dispatch(actions.requestRobots());
    const expectedAction = {
        type: REQUEST_ROBOTS_PENDING
    }

    expect(store.getActions()[0]).toEqual(expectedAction)
})

// Async action testing with mockFetch.
describe('async requestRobots action', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    const mockData = [{
        id: 1,
        name: 'John',
        email: 'john@test.email',
    }]

    it('creates REQUEST_ROBOTS_SUCCESS when fetching has been done', () => {
        fetchMock.getOnce('https://jsonplaceholder.typicode.com/users', {
            body: mockData,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions = [
            {
                type: REQUEST_ROBOTS_PENDING
            },
            {
                type: REQUEST_ROBOTS_SUCCESS,
                payload: mockData
            }
        ]

        const store = mockStore({ robots: [] })

        return store.dispatch(actions.requestRobots()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
```
#### `Comment:`
1. 完整的 async testing 文件：

__`Location: ./src/actions.test.js`__
```js
import * as actions from './actions';
import {
    CHANGE_SEARCHFIELD,
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED
} from './constants';

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it('should create an action to search robots', () => {
    const text = 'wooo';
    const expectedAction = {
        type: CHANGE_SEARCHFIELD,
        payload: text
    }
    expect(actions.setSearchField(text)).toEqual(expectedAction)
})

it('should handles requesting robots API', () => {
    const store = mockStore();
    store.dispatch(actions.requestRobots());
    const action = store.getActions();
    // console.log(action);
    const expectedAction = {
        type: REQUEST_ROBOTS_PENDING
    }

    expect(action[0]).toEqual(expectedAction)
})

describe('async requestRobots action', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    const mockData = [{
        id: 1,
        name: 'John',
        email: 'john@test.email',
    }]

    it('creates REQUEST_ROBOTS_SUCCESS when fetching has been done', () => {
        fetchMock.getOnce('https://jsonplaceholder.typicode.com/users', {
            body: mockData,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions = [
            {
                type: REQUEST_ROBOTS_PENDING
            },
            {
                type: REQUEST_ROBOTS_SUCCESS,
                payload: mockData
            }
        ]
        
        const store = mockStore({ robots: [] })

        return store.dispatch(actions.requestRobots()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
```

2. 对于测试的一个疑惑：

- 之前的测试 async action 是：
```js
const apiCall = (link) => {
  fetch(link).then(
    response => {
      return response.json();
    })
}

export const requestRobots = () => (dispatch) => {
  dispatch({ type: REQUEST_ROBOTS_PENDING })
  apiCall('https://jsonplaceholder.typicode.com/users')
    .then(data => dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_ROBOTS_FAILED, payload: error }))
}
```

- 得到：
<p align="center">
<img src="../../assets/p16-1.png" width=90%>
</p>

- 改成：
```js
const apiCall = (link) =>
  fetch(link).then(response => response.json())

export const requestRobots = () => (dispatch) => {
  dispatch({ type: REQUEST_ROBOTS_PENDING })
  apiCall('https://jsonplaceholder.typicode.com/users')
    .then(data => dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_ROBOTS_FAILED, payload: error }))
}
```

- 得到：
<p align="center">
<img src="../../assets/p16-2.png" width=90%>
</p>

- 改成：
```js
export const requestRobots = () => (dispatch) => {
  dispatch({ type: REQUEST_ROBOTS_PENDING })
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data => dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_ROBOTS_FAILED, payload: error }))
}
```

- 得到：
<p align="center">
<img src="../../assets/p16-3.png" width=90%>
</p>

__参考材料： [Redux-testing](https://redux.js.org/recipes/writing-tests)__

- #### Click here: [BACK TO CONTENT](#16.0)
- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)