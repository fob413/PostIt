import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import routes from './routes';
import 'react-materialize';
import App from './components/App';

render(
  <App />,
  document.getElementById('app')
);
