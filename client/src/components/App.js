import React, {PropTypes} from 'react';
import axios from 'axios';
import Signup from './index/signup/signup';
import Signin from './index/signin/signin';
import {signUp, signIn} from '../actions';
import CreateGroup from './broadcast/broadPage/creategroup';
import BroadPage from './broadcast/broadPage/broadpage';
import NavBar from './broadcast/broadPage/navbar';
import '../style/style.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.store = this.props.store;
    this.state = {
      signup: true
    };

    
    this.toggleSignUp = this.toggleSignUp.bind(this);
    this.signUpUser = this.signUpUser.bind(this);
    this.signInUser = this.signInUser.bind(this);
    this.loadUser = this.loadUser.bind(this);
  }

  /*
  * function toggles the user either signing up or signing in
  */
  toggleSignUp(e) {
    e.preventDefault();
    if (this.state.signup) {
      this.setState({signup: false});
    } else {
      this.setState({signup: true});
    }
  }

  /*
  * function loads the logged in user to the state
  * @param {object} user is the object of the logged in user
  */
  loadUser (user) {
    this.setState(
      {
        currentUser: user
      }
    );
  }

  /*
  * function sign up a new user
  * @param {string} userName of the intending user
  * @param {string} email of intending user
  * @param {password} password of the intending user
  */
  signUpUser(UserName, email, password) {
    if (UserName.length > 0 && email.length > 0 && password.length > 0){
      axios.post('api/user/signup', {
        UserName,
        email,
        password
      })
      .then(res => {
        this.store.dispatch(signUp(res.data.Username, res.data.isLoggedin));
      })
      .catch(err => {
        console.log('=====?????', err.message);
      });
    } else {
      alert('One of the fields is empty');
    }
  }

  /*
  * function Signs in a user
  * @param {string} userName of the user signing in
  * @param {password} password of the user signing in
  */
  signInUser(UserName, password) {
    
    if (UserName.length > 0 && password.length > 0) {
      axios.post('/api/user/signin', {
        UserName,
        password
      })
      .then(res => {
        alert(res.data);
        this.store.dispatch(signIn(res.data.Username, res.data.isLoggedin));
      })
      .catch(err => {
        console.log('===>>>>>>', err.message);
      });
    } else {
      alert('One of the signin fields is empty');
    }
  }

  render() {
    const {signup, loggedIn} = this.state;
    console.log(this.store.getState());
    if (this.store.getState().isLoggedIn) {
      return(
        <div>
          <NavBar />
          <BroadPage />
          
        </div>
      );
    } else {
      if (signup){
        return (
          <div>
            <Signup
              toggleSignUp={this.toggleSignUp}
              signUpUser = {this.signUpUser}
            />
          </div>
        );
      } else {
        return (
          <div>
            <Signin
              store={this.store}
              toggleSignUp={this.toggleSignUp}
              signInUser = {this.signInUser}
            />
          </div>
        )
      }
    }
  }
}

/*
* Validation of the components properties
*/
App.propTypes ={
  store: PropTypes.object.isRequired
};

export default App;