import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import 'react-materialize';
import App from './components/App';
import {createStore} from 'redux';
import myApp from './reducers';

let store = createStore(myApp);

render(
  <App store={store} />,
  document.getElementById('app')
);
