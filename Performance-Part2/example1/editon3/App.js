import React, { Component } from 'react'
import './App.css';

import Page1 from './Components/Page1';
import asyncComponent from './Components/AsyncComponent';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      route: 'page1',
    }
  }

  onRouteChange = (route) => {
    this.setState({ route: route })
  }

  render() {
    const { route } = this.state;
    if (route === 'page1') {
      return <Page1 onRouteChange={this.onRouteChange} />
    }
    else if (route === 'page2') {
      const AsyncPage2 = asyncComponent(() => import('./Components/Page2'));
      return <AsyncPage2 onRouteChange={this.onRouteChange} />
    }
    else if (route === 'page3') {
      const AsyncPage3 = asyncComponent(() => import('./Components/Page3'));
      return <AsyncPage3 onRouteChange={this.onRouteChange} />
    }
  }
}

export default App;
