angular + react.js + vue.js

large bank
flexible


components
one way data flow (state)
virtual DOM
Eco-System


create-react-app

```bash
$ sudo npm install -g create-react-app
$ create-react-app robotFriends
$ cd robotFriends
$ npm start
```

```bash
$ create-react-app robotFriends
$ cd robotFriends
$ npm start
```

如何升级现有 create-react-app ？

1. `Location: ./package.json`,

"react-scripts":"2.1.1",

2. 
```bash
$ npm install
```

使用新的方法 create-react-app

```bash
$ npx create-react-app appName
```


functinal components & class components

class
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

```jsx
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
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

```jsx
render(){
    // 必须有return
    return ( //return 里面必须用括号包住
        <div>只能有一个 div / element </div> 
    )
}
```

```bash
$ npm install tachyons
```

使用 className 而不是 class

传递数据：
```jsx
ReactDOM.render(<Hello greeting={'Hello'} />, document.getElementById('root'))
```

接数据：
```jsx
this.props.greeting
```

```jsx
import React from 'react';
import './Hello.css';

const HelloFunc = (props)=>{
    return(
        <div className='f1 tc'>
            <h1>Hello</h1>
            <p>{props.greeting}</p>
        </div>
    )
}

export default HelloFunc;
```

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


必须要写 `import React from 'react';`才能使用 JSX 语句。

## 不是 export default 情况
## JSX 中填入 JS 变量都需要使用 `{}`

```jsx
import {robots} from './robots'; 

ReactDOM.render(
    <div>
        <Hello/> 
        <Hello/> 
        <Hello/> 
        <Hello/> 
    </div>
    document.getElementById('root'))
```

使用 API 获得图片
```jsx
<img alt='robots' src={`https://robohash.org/${props.id}?size=200x200`} />
```

Distructuring:

```jsx
import React from 'react';
import './Hello.css';

const HelloFunc = ({greeting})=>{
    return(
        <div className='f1 tc'>
            <h1>Hello</h1>
            <p>{greeting}</p>
        </div>
    )
}

export default HelloFunc;
```

<Fragment> 标签；semantic

如果你想要：
```jsx
<table>
  <tr>
      <td>Hello</td>
      <td>World</td>
  </tr>
</table>
```

但按照以前写的方法：

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

将会得到：
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

这不是我们想要的，所以使用 Fragment 改写：

```jsx
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
```

这就是 Fragment 的使用场景。



parent and children

map method

render an array

```jsx
import React from 'react';
import Card form './Card';

const CardList = ({robots}) =>{
    const cardsArray = robots.map((user, i) =>{
        return <Card 
                key={i} 
                id={robots[i].id} 
                name={robots[i].name} 
                email={robots[i].email} 
                />
    })
    return(
        <div>
            {cardsArray}
        </div>
    )
}
```

passing state and state method around

defind a bind function,及向下传递一个函数，这个函数的操作会影响在父组件的 state 的值。注意，每个区可以写的代码是什么。

```jsx
class App extends Component{
    constructor(){
        super();
        this.state = {
            robots : robots,
            searchField : '',
        }
    }

    onSearchChange = (event) =>{
        this.setState({searchField: event.target.value})
    }

    render(){
        const filterdRobots = this.state.robots.filter(robot =>{
            return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase())
        })
        return(
            <div>
                <hi>Robots Friends</h1>
                <SearchBox onSearchChange={this.onSearchChange}/>
                <CardList robots={filterdRobots} />
            </div>
        )
    }
}
```





styling your react app

className

advanced react section

introduction about API

life-cycle hoot

every the state change, call render() method again.

json is a promise.

fetch is a window method.

termery `? :`

```jsx
class App extends Component{
    constructor(){
        super();
        this.state = {
            robots : robots,
            searchField : '',
        }
    }

    onSearchChange = (event) => {
        this.setState({searchField: event.target.value})
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=>{
            return response.json();
        })
        .then(users =>{
            this.setState({
                robots: users,
            })
        })
    }

    render(){
        const filterdRobots = this.state.robots.filter(robot =>{
            return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase())
        })
        if(this.state.robots.length === 0){
            return <h1>Loading</h1>
        }
        else{
            return(
                <div>
                    <hi>Robots Friends</h1>
                    <SearchBox onSearchChange={this.onSearchChange}/>
                    <CardList robots={filterdRobots} />
                </div>
            )
        }
    }
}
```

如何实现指定组件被包围，成为可滑动组件？

包围型 componet

wrap component



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

file structure

components folder: pure functions
containers folder: state functions

distructuring
termery

```bash
$ npm run build
```

Keep your project up to date and secure

`update all dependencies and ifx vuneribility`

```bash
$ npm audit fix
$ npm audit
$ npm audit fix --force

$ npm update
```

react error boundary, 
类似于后端的 error handling。

这里叠加了一个 children wrap component 的操作。

这个只会在 production 模式中看到详细出错的地方。

```jsx
import React, {Component} from 'react';

class ErrorBoundry extends Component{
    constructor(props){
        super();
        this.state = {
            hsaError:false,
        }
    }

    componentDidCatch(error, info){
        this.setState({ hasError: true})
    }

    render(){
        if(this.state.hasError){
            return <h1>Something is wrong</h1>
        }
        return this.state.props.children;
    }
}
```

Deploy your react app in Github.

