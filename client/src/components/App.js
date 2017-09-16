import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignUp from '../components/index/signup/signup';
import SignIn from '../components/index/signin/signin';
import PageNotFound from '../components/pagenotfound/pagenotfound';
import BroadPage from '../components/broadcast/broadPage/broadpage';
import Navbar from '../components/navbar/navbar';
import Profile from '../components/navbar/profile';
import MessageBoard from '../components/messagePage/messageBoard';
import Reset from '../components/index/password/reset';
import ResetPassword from '../components/index/password/resetPassword';
import '../style/style.css';

const history = createBrowserHistory();

const App = (props) => (
  <Router history={history}>
    <div>
      <Navbar/>
        <Switch>
          <Route exact path="/" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/broadpage" component={BroadPage} />
          <Route path="/messageboard" component={MessageBoard} />
          <Route path="/profile" component={Profile} />
          <Route path="/reset/password" component={Reset} />
          <Route path="/reset/:token" component={ResetPassword} />
          <Route component={PageNotFound} />
        </Switch>
    </div>
  </Router>
);

export default App;
