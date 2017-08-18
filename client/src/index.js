import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router} from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import App from './components/App';
import rootReducer from './reducers/rootReducer';
import 'react-materialize';
import { authenticateUser } from './components/auth';
import { RELOAD_USER_IN } from './constants';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if (localStorage.getItem('x-auth')) {
  authenticateUser(localStorage.getItem('x-auth'), store.dispatch);
}

store.subscribe(() => 
console.log('ndjnjndj', store.getState()))

ReactDOM.render(
  <Provider store={store} >
    <Router>
      <App />
    </Router>
  </Provider>
  ,
  document.getElementById('app')
);