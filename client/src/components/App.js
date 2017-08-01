import React, {PropTypes} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Signup from './index/signup/signup';
import Signin from './index/signin/signin';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Signup} />
          <Route exact path="/signin" component={Signin} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;