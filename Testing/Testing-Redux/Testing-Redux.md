# Web development tools (Part 15)

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

## `Section: Testing` (Part 3: Redux)

### `Summary`: In this documentation, we learn Redux testing.

### `Check Dependencies & Tools:`

- Enzyme
- redux-store-mock
- fetch-mock

------------------------------------------------------------

#### `本章背景：`
- __参考材料 [Redux-testing](https://redux.js.org/recipes/writing-tests)__
- 本章分三部分，分别是：
    1. Function testing 
    2. React testing 
    3. Redux testing :white_check_mark:

------------------------------------------------------------

### <span id="15.0">`Brief Contents & codes position`</span>

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

- [15.1 Props and component function testing.](#15.1)
- [15.2 Reducers testing.](#15.2)
- [15.3 Sync action testing.](#15.3)
- [15.4 Async action testing.](#15.4)

------------------------------------------------------------

### <span id="15.1">`Step1: Testing props and component function.`</span>

- #### Click here: [BACK TO CONTENT](#15.0)

1. Seperate App component to two parts.

__`Location: ./src/containers/App.js`__

```js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSearchField, requestRobots } from '../actions';

import Mainpage from '../components/Mainpage';
import './App.css';


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

class App extends Component {
  render() {
    return <Mainpage {...this.props} />
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
```
----------------------------------------------------------------------------
__`Location: ./src/components/Mainpage.js`__

```js
import React, { Component } from 'react';

import CardList from '../components/CardList';
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
                    {isPending ? <h1>Loading</h1> :
                        <ErrorBoundry>
                            <CardList robots={this.filterRobots()} />
                        </ErrorBoundry>
                    }
                </Scroll>
            </div>
        );
    }
}

export default Mainpage;
```

2. Snapshot tesing, props testing, self function testing.

__`Location: ./src/components/Mainpage.test.js`__

```js
import { shallow, mount, render } from 'enzyme';
import React from 'react';
import Mainpage from './Mainpage';
import '../setupTests'

let wrapper;
beforeEach(() => {
    const mockProps = {
        onRequestRobots: jest.fn(),
        robots: [],
        searchField: '',
        isPending: false,
    }
    wrapper = shallow(<Mainpage {...mockProps} />);
})

//snapshot testing
it('renders Mainpage without crashing', () => {
    expect(wrapper).toMatchSnapshot();
})

//props testing
it('render h1 tag when isPending is true', () => {
    const mockProps = {
        onRequestRobots: jest.fn(),
        robots: [],
        searchField: '',
        isPending: true,
    }
    wrapper = shallow(<Mainpage {...mockProps} />);
    expect(wrapper.contains(<h1>Loading</h1>)).toBe(true);
})

//self function testing
it('filters robots correctly', () => {
    const mockProps = {
        onRequestRobots: jest.fn(),
        robots: [{
            id: 1,
            name: 'John',
            email: 'john@test.email',
        }],
        searchField: 'john',
        isPending: false,
    }

    wrapper = shallow(<Mainpage {...mockProps} />);
    expect(wrapper.instance().filterRobots()).toEqual(
        [
            {
                id: 1,
                name: 'John',
                email: 'john@test.email',
            }
        ]
    )
})
```

#### `Comment:`
1. 在这里要标记一个小 enzyme 用法：
    - 引用 stateful component 接收的 props 或者自定义 function：
    ```diff
    + wrapper.props().robots
    + wrapper.props().filterRobots()
    ```
    - 引用 stateless component 接收的 props：
    ```diff
    + wrapper.instance().robots
    + wrapper.instance().filterRobots()
    ```

### <span id="15.2">`Step2: Reducers testing.`</span>

- #### Click here: [BACK TO CONTENT](#15.0)

__`Location: ./src/reducers.test.js`__
```js
import {
    CHANGE_SEARCHFIELD,
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED
} from './constants';

import * as reducers from './reducers';

describe('searchRobots reducer', () => {
    const initialStateSearch = {
        searchField: ''
    }
    it('should return the initial state', () => {
        expect(reducers.searchRobots(initialStateSearch, {})).toEqual({ searchField: '' })
    })
    it('should handle CHANGE_SEARCHFIELD action', () => {
        expect(reducers.searchRobots(initialStateSearch, {
            type: CHANGE_SEARCHFIELD,
            payload: 'abc'
        })).toEqual({
            searchField: 'abc'
        })
    })
})

describe('requestRobots reducer', () => {
    const initialStateRobots = {
        robots: [],
        isPending: false
    }

    it('should return the initial state', () => {
        expect(reducers.requestRobots(initialStateRobots, {})).toEqual(initialStateRobots)
    })

    it('should handle REQUEST_ROBOTS_PENDING action', () => {
        expect(reducers.requestRobots(initialStateRobots, {
            type: REQUEST_ROBOTS_PENDING,
        })).toEqual({
            robots: [],
            isPending: true,
        })
    })

    it('should handle REQUEST_ROBOTS_SUCCESS action', () => {
        expect(reducers.requestRobots(initialStateRobots, {
            type: REQUEST_ROBOTS_SUCCESS,
            payload: [{
                id: 123,
                name: 'John',
                email: 'john@test.com'
            }]
        })).toEqual({
            robots: [{
                id: 123,
                name: 'John',
                email: 'john@test.com'
            }],
            isPending: false,
        })
    })

    it('should handle REQUEST_ROBOTS_FAILED action', () => {
        expect(reducers.requestRobots(initialStateRobots, {
            type: REQUEST_ROBOTS_FAILED,
            payload: 'This is an error message.'
        })).toEqual({
            error: 'This is an error message.',
            isPending: false,
            robots: [],
        })
    })
})
```
----------------------------------------------------------------------------

#### `Comment:`
1. reducer 的测试主要是测试一个 switch 函数的功能。

### <span id="15.3">`Step3: Sync action testing.`</span>

- #### Click here: [BACK TO CONTENT](#15.0)

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
import * as actions from './actions';
import {
    CHANGE_SEARCHFIELD,
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED
} from './constants';

import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const mockStore = configureMockStore([thunkMiddleware]);

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


### <span id="15.4">`Step4: Async action testing.`</span>

- #### Click here: [BACK TO CONTENT](#15.0)

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
<img src="../assets/p15-1.png" width=90%>
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
<img src="../assets/p15-2.png" width=90%>
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
<img src="../assets/p15-3.png" width=90%>
</p>

__参考材料 [Redux-testing](https://redux.js.org/recipes/writing-tests)__

- #### Click here: [BACK TO CONTENT](#15.0)
- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)