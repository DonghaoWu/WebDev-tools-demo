# Web development tools (Part 18)

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

## `Section: Server-side-rendering` (Basic & Application)

### `Summary`: In this documentation, we learn to convert robotFriends app to nextJS app and some knowledge about SSR vs CSR.

### `Check Dependencies & Tools:`

- next
- isomorphic-unfetch
- react
- react-dom
- tachyons

------------------------------------------------------------

#### `本章背景：`
- 本章参考的官方资料： [nextJS documentation](https://nextjs.org/docs/getting-started)
- 本节中用到的 demo app 是 `robotFriends-nextJS`

------------------------------------------------------------

### <span id="18.0">`Brief Contents & codes position`</span>

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

- [18.1 CSR vs SSR.](#18.1)
- [18.2 Why next.js?](#18.2)
- [18.3 Configuration.](#18.3)
- [18.4 Adding CSS library to the project.](#18.4)
- [18.5 Copy and paste files from robotFriends.](#18.5)
- [18.6 Add dynamic routing into the app.](#18.6)


------------------------------------------------------------

### <span id="18.1">`Step1: CSR vs SSR.`</span>

- #### Click here: [BACK TO CONTENT](#18.0)

1. [Server-side vs Client-side Routing
](https://medium.com/@wilbo/server-side-vs-client-side-routing-71d710e9227f)
2. 


### <span id="18.2">`Step2: Why next.js?.`</span>

- #### Click here: [BACK TO CONTENT](#18.0)


### <span id="18.3">`Step3: Configuration.`</span>

- #### Click here: [BACK TO CONTENT](#18.0)

1. `We recommend creating a new Next.js app using create-next-app, which sets up everything automatically for you. To create a project, run:`

```bash
$ npx create-next-app 
```
----------------------------------------------------------------------------

2. Install dependencies.

```bash
$ npm i isomorphic-unfetch tachyons
```
----------------------------------------------------------------------------

#### `Comment:`
1. 

### <span id="18.4">`Step4: Adding CSS library to the project.`</span>

- #### Click here: [BACK TO CONTENT](#18.0)

1. Create a new file call `_app.js`. [next.js CSS documentation.](https://nextjs.org/docs/basic-features/built-in-css-support)

__`Location: ./demo-apps/robotFriends-nextJS/pages/_app.js`__

```js
import '../styles.css';
import 'tachyons';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}
```

2. Add code in `index.js`
__`Location: ./demo-apps/robotFriends-nextJS/pages/index.js`__

```js
import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import fetch from 'isomorphic-unfetch';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchfield: ''
    }
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  render() {
    const { searchfield } = this.state;
    const { robots } = this.props;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    return !robots.length ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <ErrorBoundary>
              <CardList robots={filteredRobots} />
            </ErrorBoundary>
          </Scroll>
        </div>
      );
  }
}

App.getInitialProps = async function () {
  console.log(`Global call======>`);
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  return {
    robots: data,
  }
}
export default App;
```

#### `Comment:`
1. 在这里要注意的是这个代码跟原来 robotFriends 的 App.js 差不多，最大的区别是：

```js
App.getInitialProps = async function () {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  return {
    robots: data,
  }
}
```

2. 然后在 APP 组件中可以通过以下方式获得 data：
```js
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchfield: ''
    }
  }

  render(){
      //...
      const {robots} = this.props;
      /*
      ...
      */
  }
}
```


### <span id="18.5">`Step5: Copy and paste files from robotFriends.`</span>

- #### Click here: [BACK TO CONTENT](#18.0)

1. 文件列表：
    - `Location: ./demo-apps/robotFriends-nextJS/components/Card.js`
    - `Location: ./demo-apps/robotFriends-nextJS/components/CardList.js`
    - `Location: ./demo-apps/robotFriends-nextJS/components/ErrorBoundary.js`
    - `Location: ./demo-apps/robotFriends-nextJS/components/Scroll.js`
    - `Location: ./demo-apps/robotFriends-nextJS/components/SearchBox.js`

2. Run dev command:
```bash
$ npm run dev
```

#### `Comment:`
1. 

### <span id="18.6">`Step6: Add dynamic routing into the app.`</span>

- #### Click here: [BACK TO CONTENT](#18.0)

- 参考资料：[Dynamic content in Next.js with the router](https://flaviocopes.com/nextjs-dynamic-content/)

1. :star: 要修改的旧版本文件列表：

- __`Location: ./demo-apps/robotFriends-nextJS/components/Card.js`__
```js
import React from 'react';

const Card = ({ name, email, id }) => {
  return (
    <div className='tc grow bg-light-green br3 pa3 ma2 dib bw2 shadow-5'>
      <img alt='robots' src={`https://robohash.org/${id}?size=200x200`} />
      <div>
        <h2>{name}</h2>
        <p>{email}</p>
      </div>
    </div>
  );
}

export default Card;
```

- __`Location: ./demo-apps/robotFriends-nextJS/pages/_app.js`__
```js
import '../styles.css';
import 'tachyons';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}
```
- __`Location: ./demo-apps/robotFriends-nextJS/pages/index.js`__
```jsx
import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import fetch from 'isomorphic-unfetch';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchfield: ''
    }
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  render() {
    const { searchfield } = this.state;
    const { robots } = this.props;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    return !robots.length ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <ErrorBoundary>
              <CardList robots={filteredRobots} />
            </ErrorBoundary>
          </Scroll>
        </div>
      );
  }
}

App.getInitialProps = async function () {
  console.log(`Global call======>`);
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  return {
    robots: data,
  }
}
export default App;
```

2. :star: Solution 1:
- __`Location: ./demo-apps/robotFriends-nextJS/components/Card.js`__

```js
import React from 'react';
import Link from 'next/link';

const Card = ({ name, email, id }) => {
  return (
    <Link href={`robots/${id}`}>
      <div className='tc grow bg-light-green br3 pa3 ma2 dib bw2 shadow-5'>
        <img alt='robots' src={`https://robohash.org/${id}?size=200x200`} />
        <div>
          <h2>{name}</h2>
          <p>{email}</p>
        </div>
      </div>
    </Link>
  );
}

export default Card;
```

- __`Location: ./demo-apps/robotFriends-nextJS/pages/_app.js`__

```js
import '../styles.css';
import 'tachyons';
import fetch from 'isomorphic-unfetch';
import React, { Component } from 'react';

// This default export is required in a new `pages/_app.js` file.
class MyApp extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { Component } = this.props;
        let pageProps = {
            robots: this.props.robots,
        };
        return (
            <Component {...pageProps} />
        )
    }
}

MyApp.getInitialProps = async function () {
    console.log('hello');
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return {
        robots: data,
    }
}

export default MyApp;
```

- __`Location: ./demo-apps/robotFriends-nextJS/pages/index.js`__

```js
import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import fetch from 'isomorphic-unfetch';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchfield: ''
    }
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  render() {
    const { searchfield } = this.state;
    const { robots } = this.props;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    return !robots.length ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <ErrorBoundary>
              <CardList robots={filteredRobots} />
            </ErrorBoundary>
          </Scroll>
        </div>
      );
  }
}

export default App;
```

- __`Location: ./demo-apps/robotFriends-nextJS/robots/[id].js`__

```js
import { useRouter } from 'next/router';
import Link from 'next/link';

export default (props) => {
    const router = useRouter();
    let robot = props.robots[router.query.id];
    return (
        robot ?
            <div style={{ textAlign: "center",  color: "white"}}>
                <h1>Robot</h1>
                <img alt='robots' src={`https://robohash.org/${robot.id}?size=200x200`} />
                <p> id: {robot.id}</p>
                <p> name: {robot.name}</p>
                <p> username: {robot.username}</p>
                <p> email: {robot.email}</p>
                <p> phone: {robot.phone}</p>
                <p> website: {robot.website}</p>
                <button><Link href={`/`}>
                    <a>Back --></a>
                </Link></button>
            </div>
            :
            <h1>Loading...</h1>
    )
}
```


#### `Comment:`
```diff
+ 比原版本修改了 Card.js，_app.js, index.js
+ 新增了 [id].js
+ 思路是从 _app.js 获取 data，然后传递给所有的 pages 使用
+ _app.js 中全局 data 的新用法。

- 不好的地方是每次点进单独机器人时，都会运行一次 api 获取全局变量。
```

3. :star: Solution 2:
- __`Location: ./demo-apps/robotFriends-nextJS/components/Card.js`__

```js
import React from 'react';
import Link from 'next/link';

const Card = ({ name, email, id }) => {
  return (
    <Link href={`robots/${id}`}>
      <div className='tc grow bg-light-green br3 pa3 ma2 dib bw2 shadow-5'>
        <img alt='robots' src={`https://robohash.org/${id}?size=200x200`} />
        <div>
          <h2>{name}</h2>
          <p>{email}</p>
        </div>
      </div>
    </Link>
  );
}

export default Card;
```

- __`Location: ./demo-apps/robotFriends-nextJS/pages/_app.js`__

```js
import '../styles.css';
import 'tachyons';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}
```

- __`Location: ./demo-apps/robotFriends-nextJS/pages/index.js`__

```js
import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import fetch from 'isomorphic-unfetch';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchfield: ''
    }
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  render() {
    const { searchfield } = this.state;
    const { robots } = this.props;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    return !robots.length ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <ErrorBoundary>
              <CardList robots={filteredRobots} />
            </ErrorBoundary>
          </Scroll>
        </div>
      );
  }
}

App.getInitialProps = async function () {
  console.log(`Global call======>`);
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  return {
    robots: data,
  }
}
export default App;
```

- __`Location: ./demo-apps/robotFriends-nextJS/robots/[id].js`__

```js
import { useRouter } from 'next/router';
import Link from 'next/link';

const Robotinfo = (props) => {
    const { robot } = props;
    return (
        robot ?
            <div style={{ textAlign: "center", color: "white" }}>
                <h1>Robot</h1>
                <img alt='robots' src={`https://robohash.org/${robot.id}?size=200x200`} />
                <p> id: {robot.id}</p>
                <p> name: {robot.name}</p>
                <p> username: {robot.username}</p>
                <p> email: {robot.email}</p>
                <p> phone: {robot.phone}</p>
                <p> website: {robot.website}</p>
                <button><Link href={`/`}>
                    <a>Back --></a>
                </Link></button>
            </div>
            :
            <h1>Loading...</h1>
    )
}

Robotinfo.getInitialProps = async function ({ query }) {
    console.log(`Individual call======>`);
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${query.id}`);
    const data = await response.json();
    return {
        robot: data,
    }
}
export default Robotinfo;
```

#### `Comment:`
```diff
+ 比原版本修改了 Card.js
+ 新增了 [id].js，但方案二 `[id].js` 和方案一的内容不一样。
+ 思路是从 [id].js 获取 data，全局 data 只获取一次，局部 data 在每一次点击卡片的时候才运行 api。

+ getInitialProps + query 的新用法。
```

- __参考资料：[Dynamic content in Next.js with the router](https://flaviocopes.com/nextjs-dynamic-content/)__

- __参考资料：[Get query params in Next.js](https://codeconqueror.com/blog/get-query-params-in-next-js)__

- #### Click here: [BACK TO CONTENT](#18.0)
- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)