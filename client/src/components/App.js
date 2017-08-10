import React, {PropTypes} from 'react';
import axios from 'axios';
import Signup from './index/signup/signup';
import Signin from './index/signin/signin';
import {signUp, signIn, signOut} from '../actions';
import CreateGroup from './broadcast/broadPage/creategroup';
import BroadPage from './broadcast/broadPage/broadpage';
import NavBar from './broadcast/broadPage/navbar';
import Sample from './broadcast/broadPage/sample';
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
    this.logoutUser = this.logoutUser.bind(this);
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
        this.store.dispatch(signIn(res.data.UserName, res.data.isLoggedin));
      })
      .catch(err => {
        console.log('===>>>>>>', err.message);
      });
    } else {
      alert('One of the signin fields is empty');
    }
  }

  logoutUser(){
    console.log(`1 ${this.store.getState().Username} 2 ${this.store.getState().UserName}`);
    axios.get('api/user/signout', {
      
    })
    .then(res => {
      this.store.dispatch(signOut(res.data.isLoggedin));
    })
    .catch(err => {
      alert(`${err.message} Please try again later!`);
    });
  }

  render() {
    const {signup} = this.state;
    if (this.store.getState().isLoggedIn) {
      return(
        <div>
          <NavBar logout={this.logoutUser}/>
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