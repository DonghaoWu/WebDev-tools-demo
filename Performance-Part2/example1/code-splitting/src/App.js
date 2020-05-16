import React, { Component } from 'react'
import './App.css';

import Page1 from './Components/Page1';
import Page2 from './Components/Page2';
import Page3 from './Components/Page3';

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
      return <Page2 onRouteChange={this.onRouteChange} />
    }
    else if (route === 'page3') {
      return <Page3 onRouteChange={this.onRouteChange} />
    }
  }
}

export default App;
