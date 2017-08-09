import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import 'react-materialize';
import App from './components/App';
import {createStore} from 'redux';
import myApp from './reducers';

let store = createStore(myApp);

function render () {
  ReactDOM.render(
    <App store={store} />,
    document.getElementById('app')
  );
}

store.subscribe(render);

render();