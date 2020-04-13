# Web development tools (Part 4)

## `Section: Front-end`(React)

### `Summary`: In this documentation, we learn React.js.

### `Check Dependencies:`

- react
- tachyons

------------------------------------------------------------

#### `本章背景：`
- 

```diff

```

### `Brief Contents & codes position`
- 4.1 About `create-react-app` command.
- 4.2 Class component & Functional component.
- 4.3 Props & state.
- 4.4 Wrap component & `<Fragment>`.
- 4.5 life-cycle.
- 4.6 React error boundary.
- 4.7 React syntax.
- 4.8 Deploy React app in Github.

------------------------------------------------------------

### `Step1: About create-react-app command.`

- 旧版操作
```bash
$ sudo npm install -g create-react-app # only run once.

$ create-react-app YOUR-APP-NAME
$ cd YOUR-APP-NAME
$ npm start
```

- 新版操作
```bash
$ npx create-react-app YOUR-APP-NAME
```

- 升级方法：
    1. 手动修改：
        __`Location: ./package.json`__ 里面的`"react-scripts":"2.1.1",`版本号。

    2. 执行命令：

    ```bash
    $ npm install
    ```

- Keep your project up to date and secure, `update all dependencies and fix vulnerabilities`
    
    ```bash
    $ npm audit fix
    $ npm audit
    $ npm audit fix --force

    $ npm update
    ```
- Build a production code.
    
    ```bash
    $ npm run build
    ```

#### `Comment:`
1. 

### `Step2: Class component & Functional component.`

__`Location: ./robotfriends/src/App.js`__

- Class component
```jsx
import React from 'react';
import logo from './logo.svg';
import './App.css';
 
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
 
export default App;
```

- Functional component.

```jsx
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() { // const App = () =>{}
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

#### `Comment:`
1. React 相关语法

```jsx
render(){
    // 必须有return
    return ( //return 里面必须用括号包住
        <div>只能有一个 div / element </div> 
    )
}
```

2. class component 里面有 `render(){}`，但是 funcitonal component 里面不需要，直接是 `return()`。


### `Step3: Props & state.`

- 从 parent component 向 child component 传递数据。

```jsx
ReactDOM.render(<Hello greeting={'Hello'} />, document.getElementById('root'))
```

- 在 child component 接收数据。

```jsx
    { this.props.greeting } // class component

    { props.greeting } // functional component
```

- 例子：

    - Class component.
    ```jsx
    import React, {Component} from 'react';
    import './Hello.css';

    class HelloClass extends Component{
        render(){
            return(
                <div className='f1 tc'>
                    <h1>Hello</h1>
                    <p>{this.props.greeting}</p>
                </div>
            )
        }
    }

    export default HelloClass;
    ```

    - Functional component.

    ```jsx
    import React from 'react';
    import './Hello.css';

    const HelloFunc = (props)=>{ // const HelloFunc = ({ greeting }) => {}
        return(
            <div className='f1 tc'>
                <h1>Hello</h1>
                <p>{props.greeting}</p>
            </div>
        )
    }

    export default HelloFunc;
    ```

#### `Comment:`
1. 

### `Step4: <Fragment> & Wrap component.`

A. __为什么要使用 `<Fragment>`？__

1. 如果你想要：

```jsx
    <table>
        <tr>
            <td>Hello</td>
            <td>World</td>
        </tr>
    </table>
```

2. 但按照以前写的方法：

```jsx
    class Table extends React.Component {
        render() {
            return (
                <table>
                    <tr>
                        <Columns />
                    </tr>
                </table>
            );
        }
    }

    class Columns extends React.Component {
        render() {
            return (
                <div>
                    <td>Hello</td>
                    <td>World</td>
                </div>
            );
        }
    }
```

3. 将会得到：
```jsx
    <table>
        <tr>
            <div>
                <td>Hello</td>
                <td>World</td>
            </div>
        </tr>
    </table>
```

4. 这不是我们想要的，所以使用 Fragment 改写：

```jsx
import { Fragment } from React;

class Columns extends React.Component {
    render() {
        return (
            <Fragment>
                <td>Hello</td>
                <td>World</td>
            </Fragment>
        );
    }
}

export default Columns;
```

B. __如何实现`窗中窗`功能 Wrap component？__

```jsx
import Scroll from 'Scroll';

<Scroll>
    <CardList robots={filterdRobots} />
</Scroll>
```

```jsx
import React from 'react';

const Scroll = (props) => {
    return{
        <div style={{overflowY:'scroll',border:'5px solid black', height:'600px'}}>
            {props.children}
        </div>
    }
}
```

效果展示：

<p align="center">
<img src="../assets/w9.png" width=90%>
</p>

#### `Comment:`
1. 在这里 `props.children` 就相当于被包围的子组件 `CardList`。

### `Step5: life-cycle.`

```jsx
class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: robots,
            searchField: '',
        }
    }

    onSearchChange = (event) => {
        this.setState({ searchField: event.target.value })
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                return response.json();
            })
            .then(users => {
                this.setState({
                    robots: users,
                })
            })
    }

    render() {
        const filterdRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase())
        })
        if (this.state.robots.length === 0) {
            return <h1>Loading</h1>
        }
        else {
            return (
                <div>
                    <h1>Robots Friends</h1>
                    <SearchBox onSearchChange={this.onSearchChange} />
                    <CardList robots={filterdRobots} />
                </div>
            )
        }
    }
}
```


#### `Comment:`
1. 

### `Step6: React error boundary.`

```jsx
import React, {Component} from 'react';

class ErrorBoundry extends Component{
    constructor(props){
        super();
        this.state = {
            hasError:false,
        }
    }

    componentDidCatch(error, info){
        this.setState({ hasError: true})
    }

    render(){
        if(this.state.hasError){
            return <h1>Something is wrong.</h1>
        }
        return this.state.props.children;
    }
}
```


#### `Comment:`
1. react error boundary，类似于后端的 error handling。

2. 这里叠加了一个 children wrap component 的操作。

3. 这个只会在 production 模式中看到详细出错的地方。

### `Step7: React syntax.`

1. 多个 component 显示。

```jsx
import { robots } from './robots';

ReactDOM.render(
    <div>
        <Hello />
        <Hello />
        <Hello />
        <Hello />
    </div>,
    document.getElementById('root'))
```

2. 使用 API 获得图片。

```jsx
<img alt='robots' src={`https://robohash.org/${props.id}?200x200`} />
```

3. Distructuring。

```jsx
import React from 'react';
import './Hello.css';

const HelloFunc = ({ greeting }) => {
    return (
        <div className='f1 tc'>
            <h1>Hello</h1>
            <p>{greeting}</p>
        </div>
    )
}

export default HelloFunc;
```

4. 必须要写 `import React from 'react';`才能使用 JSX 语句。

5. 不是 export default 情况，JSX 中填入 JS 变量都需要使用 `{}`，也叫做 distructuring。

6. file structure
    - components folder: pure functions
    - containers folder: state functions

7. Using map method to render an array :

```jsx
import React from 'react';
import Card from './Card';

const CardList = ({ robots }) => {
    const cardsArray = robots.map((user, i) => {
        return <Card
                key={i}
                id={robots[i].id}
                name={robots[i].name}
                email={robots[i].email}
        />
    })
    return (
        <div>
            {cardsArray}
        </div>
    )
}
```

8. Defind a bind function,及向下传递一个函数，这个函数的操作会影响在父组件的 state 的值。`在这里要说明的是，在类中使用箭头定义法就不用在 constructor中使用 bind 操作。`

```jsx
class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: robots,
            searchField: '',
        }
    }

    onSearchChange = (event) => {
        this.setState({ searchField: event.target.value })
    }

    render() {
        const filterdRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase())
        })
        return (
            <div>
                <h1>Robots Friends</h1>
                <SearchBox onSearchChange={this.onSearchChange} />
                <CardList robots={filterdRobots} />
            </div>
        )
    }
}
```

9. 使用 className 而不是 class。

10. json() is a promise.

11. fetch() is a window method.

12. Every time the state change, call render() method again.

13. ternary `? :`.

#### `Comment:`
1. 

### `Step8: Deploy React app in Github.`

#### `Comment:`
1. 


### `Step9 Concept questions.`

#### `A. How does react life-cycle work?`


