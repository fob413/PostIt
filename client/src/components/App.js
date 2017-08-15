import React, {PropTypes} from 'react';
import axios from 'axios';
import Signup from './index/signup/signup';
import Signin from './index/signin/signin';
import {signUp, signIn, signOut} from '../actions';
import CreateGroup from './broadcast/broadPage/creategroup';
import BroadPage from './broadcast/broadPage/broadpage';
import NavBar from './broadcast/broadPage/navbar';
import Sample from './broadcast/broadPage/sample';
import Profile from './broadcast/broadPage/profile';
import MessageBoard from './broadcast/messagePage/messageBoard';;
import '../style/style.css';
import '../style/materialize/css/materialize.min.css';
import '../style/materialize/js/materialize.min';

class App extends React.Component {
  constructor(props){
    super(props);
    this.store = this.props.store;
    this.state = {
      signup: true,
      dashBoard: true,
      profileBoard: false,
      messageBoard: false,
      currentGroup: ''
    };

    
    this.toggleSignUp = this.toggleSignUp.bind(this);
    this.signUpUser = this.signUpUser.bind(this);
    this.signInUser = this.signInUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.toggleDashBoard = this.toggleDashBoard.bind(this);
    this.toggleProfileBoard = this.toggleProfileBoard.bind(this);
    this.toggleMessageBoard = this.toggleMessageBoard.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(message, priority){
    let {currentGroup} = this.state;
    const config = {
      headers: {'x-auth': this.store.getState().token}
    };
    console.log(priority);
    axios.post(`api/group/${currentGroup}/message`, {
      content: message
    }, config)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(`${err.response.data.message}`);
    });
  }

  toggleMessageBoard(currentGroup) {
    if (!this.state.messageBoard) {
      this.setState({
        profileBoard: false,
        dashBoard: false,
        messageBoard: true,
        currentGroup
      })
      console.log(this.state.currentGroup);
    } else {
      this.setState({
        profileBoard: false,
        dashBoard: true,
        messageBoard: false,
        currentGroup: ''
      });
    }
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
      // Materialize.toast('I am a toast!', 4000);
    }
  }

  toggleDashBoard(e) {
    // do something
  }

  toggleProfileBoard() {
    if (this.state.profileBoard) {
      this.setState({
        profileBoard: false,
        dashBoard: true,
        messageBoard: false
      });
    } else {
      this.setState({
        profileBoard: true,
        dashBoard: false,
        messageBoard: false
      });
    }
  }

  /*
  * function sign up a new user
  * @param {string} userName of the intending user
  * @param {string} email of intending user
  * @param {password} password of the intending user
  */
  signUpUser(UserName, email, password, telephone) {
    if (UserName.length > 0 && email.length > 0 
        && password.length > 0 && telephone.length > 0){
      axios.post('api/user/signup', {
        UserName,
        email,
        password,
        telephone
      })
      .then(res => {
        alert('Successfully Signed Up');
        this.store.dispatch(signUp(
          res.data.UserName,
          res.data.isLoggedin,
          res.data.token,
          res.data.email,
          res.data.telephone
        ));
      })
      .catch(err => {
        alert(err.message);
        console.log(err);
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
        alert('Successfully Signed In');
        this.store.dispatch(signIn(
          res.data.UserName,
          res.data.isLoggedin,
          res.data.token,
          res.data.email,
          res.data.telephone
        ));
      })
      .catch(err => {
        console.log('===>>>>>>', err.message);
      });
    } else {
      alert('One of the signin fields is empty');
    }
  }

  logoutUser(){
    const config = {
      headers: {'x-auth': this.store.getState().token}
    };

    axios.get('api/user/signout', config)
    .then(res => {
      this.store.dispatch(signOut(res.data.isLoggedin));
      this.setState({
        dashBoard: true,
        profileBoard: false
      });
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
          <NavBar
            logout={this.logoutUser}
            toggleProfileBoard={this.toggleProfileBoard}
          />
          {this.state.dashBoard ? 
            <div>
              <BroadPage
                store={this.store}
                toggleMessageBoard={this.toggleMessageBoard}
              />
            </div> :
            this.state.messageBoard ?
            
            <div>
              <MessageBoard
                toggleMessageBoard={this.toggleMessageBoard}
                sendMessage={this.sendMessage}
              />
            </div> :
            
            <div>
              <Profile
              store={this.store}
            />
            </div>
          }
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
        );
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