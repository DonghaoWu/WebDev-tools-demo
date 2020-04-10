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
$ create-react-app robotfriends
$ cd robotfriends
$ npm start
```

```bash
$ create-react-app robotfriends
$ cd robotfriends
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


