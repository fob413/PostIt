import React, {PropTypes} from 'react';
import Signup from './index/signup/signup';
import Signin from './index/signin/signin';
import CreateGroup from './broadcast/broadPage/creategroup';
import BroadPage from './broadcast/broadPage/broadpage';
import NavBar from './broadcast/broadPage/navbar';
import '../style/style.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
      signup: true,
      loggedIn: false,
      idNum: 1
    };

    this.toggleLoggedIn = this.toggleLoggedIn.bind(this);
    this.toggleSignUp = this.toggleSignUp.bind(this);
    this.signUpUser = this.signUpUser.bind(this);
    this.signInUser = this.signInUser.bind(this);
  }

  toggleLoggedIn() {
    if (this.state.loggedIn){
      this.setState({loggedIn: false});
    } else {
      this.setState({loggedIn: true});
    }
  }

  toggleSignUp(e) {
    e.preventDefault();
    if (this.state.signup) {
      this.setState({signup: false});
    } else {
      this.setState({signup: true});
    }
  }

  signUpUser(userName, email, password) {
    if (userName.length > 0 && email.length > 0 && password.length > 0){
      let id = this.state.idNum;
      const users = [
        ...this.state.users,
        {
          id: id,
          userName,
          email,
          password
        }
      ];
      let newId = id + 1;
      this.setState({users});
      this.setState({idNum: newId});
      this.toggleLoggedIn();
    } else {
      alert('One of the fields is empty');
    }
  }

  signInUser(userName, password) {
    
    if (userName.length > 0 && password.length > 0) {
      if (this.state.users.length > 0){
        this.state.users.map((user, i) => {
          if (user.userName == userName && user.password == password){
            this.toggleLoggedIn();
          } else {
            alert('invalid credentials');
          }
        });
      } else {
        alert('Please Sign Up');
      }
    } else {
      alert('One of the signin fields is empty');
    }
  }

  render() {
    const {signup, loggedIn} = this.state;
    if (loggedIn) {
      return(
        <div>
          <NavBar />
          <BroadPage />
          <h1>BROADCAST BOARD<br />CREATE GROUPS AND ALL THE LIKES</h1>
          <button onClick={this.toggleLoggedIn}>LOG OUT</button>
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
              toggleSignUp={this.toggleSignUp}
              signInUser = {this.signInUser}
            />
          </div>
        )
      }
    }
  }
}

export default App;