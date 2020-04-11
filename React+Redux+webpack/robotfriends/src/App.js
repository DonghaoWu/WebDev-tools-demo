import React from 'react';
import logo from './logo.svg';
import './App.css';
import HelloFunc from './components/Hello-func';
import HelloClass from './components/Hello-class';

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
      <body>
        <HelloClass greeting={`How are you from class component?`} />
        <HelloFunc greeting={`How are you from functional component?`} />
      </body>
    </div>
  );
}

export default App;
