import React, {PropTypes} from 'react';
import Signup from './index/signup/signup';
import Signin from './index/signin/signin';
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
  }

  toggleLoggedIn(e) {
    e.preventDefault();
    if (this.state.loggedIn){
      this.setState({loggedIn: false});
    } else {
      this.setState({loggedIn: true});
    }
  }

  toggleSignUp(e) {
    e.preventDefault();
    alert('toggle signup button has been clicked');
    this.state.users.map((user, i) => console.log(user, i));
    if (this.state.signup) {
      this.setState({signup: false});
    } else {
      this.setState({signup: true});
    }
  }

  signUpUser(userName, email, password) {
    if (userName.length > 0 || email.length || password.length){
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
      console.log("===>>>>>>>", this.state.users, this.state.idNum);
    } else {
      console.log('One of the fields is empty');
    }
  }

  render() {
    const {signup, loggedIn} = this.state;
    if (loggedIn) {
      return(
        <div>
          <h1>BROADCAST BOARD<br />CREATE GROUPS AND ALL THE LIKES</h1>
          <button onClick={this.toggleLoggedIn}>LOG OUT</button>
        </div>
      );
    } else {
      if (signup){
        return (
          <div>
            <Signup toggleSignUp={this.toggleSignUp} signUpUser = {this.signUpUser} />
          </div>
        );
      } else {
        return (
          <div>
            <Signin toggleSignUp={this.toggleSignUp} />
          </div>
        )
      }
    }
  }
}

export default App;