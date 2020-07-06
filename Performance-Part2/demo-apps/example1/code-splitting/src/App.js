import React, { Component, Suspense } from 'react'
import './App.css';

import Page1 from './Components/Page1';
const LazyPage2 = React.lazy(() => import('./Components/Page2'));
const LazyPage3 = React.lazy(() => import('./Components/Page3'));

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
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <LazyPage2 onRouteChange={this.onRouteChange} />
        </Suspense>)
    }
    else if (route === 'page3') {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <LazyPage3 onRouteChange={this.onRouteChange} />
        </Suspense>)
    }
  }
}

export default App;
