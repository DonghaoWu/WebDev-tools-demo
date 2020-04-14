import React from 'react';
import ReactDOM from 'react-dom';
import 'tachyons';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './store'
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
