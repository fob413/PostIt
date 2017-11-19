import React from 'react';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from '../components/authentication/Signup';
import Signin from '../components/authentication/Signin';
import PageNotFound from '../components/PageNotFound';
import Dashboard from '../components/dashBoard/DashBoard';
import Navbar from '../components/navbar/Navbar';
import Profile from '../components/navbar/Profile';
import MessageBoard from '../components//messageBoard/MessageBoard';
import Reset from '../components/authentication/password/Reset';
import ResetPassword from '../components/authentication/password/ResetPassword';
import Footer from '../components/Footer';
import '../style/style.css';

const history = createBrowserHistory();

const App = () => (
  <Router history={history}>
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/messageboard" component={MessageBoard} />
        <Route path="/profile" component={Profile} />
        <Route path="/reset/password" component={Reset} />
        <Route path="/reset/:token" component={ResetPassword} />
        <Route component={PageNotFound} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

export default App;
