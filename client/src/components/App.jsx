import React from 'react';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignUp from '../components/index/signup/Signup';
import SignIn from '../components/index/signin/Signin';
import PageNotFound from '../components/pagenotfound/Pagenotfound';
import Dashboard from '../components/dashboard/Dashboard';
import Navbar from '../components/navbar/Navbar';
import Profile from '../components/navbar/Profile';
import MessageBoard from '../components/messagePage/MessageBoard';
import Reset from '../components/index/password/Reset';
import ResetPassword from '../components/index/password/ResetPassword';
import Footer from '../components/footer/Footer';
import '../style/style.css';

const history = createBrowserHistory();

const App = () => (
  <Router history={history}>
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={SignUp} />
        <Route path="/signin" component={SignIn} />
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
