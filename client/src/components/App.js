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
      users: [
        {
          email: "fob1493@gmail.com",
          id: 0,
          password: 'ghgh',
          userName: 'fob',
          groups: [
            {
              groupName: 'Funsho Sample Group'
            },
            {
              groupName: 'Funshizzy sample group'
            }
          ],
        }
      ],
      signup: true,
      loggedIn: false,
      idNum: 1,
      currentUser: {}
    };

    this.toggleLoggedIn = this.toggleLoggedIn.bind(this);
    this.toggleSignUp = this.toggleSignUp.bind(this);
    this.signUpUser = this.signUpUser.bind(this);
    this.signInUser = this.signInUser.bind(this);
    this.loadUser = this.loadUser.bind(this);
  }

  /*
  * function toggles the user being logged in or out
  */
  toggleLoggedIn() {
    if (this.state.loggedIn){
      this.setState({loggedIn: false});
      this.setState({currentUser: {}});
    } else {
      this.setState({loggedIn: true});
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
  signUpUser(userName, email, password) {
    if (userName.length > 0 && email.length > 0 && password.length > 0){
      let id = this.state.idNum;
      const users = [
        ...this.state.users,
        {
          id: id,
          userName,
          email,
          password,
          groups: [
            {
              groupName: 'Sample Group To Show'
            }
          ]
        }
      ];
      const user = {
        id: id,
        userName,
        email,
        password,
        groups: [
          {
            groupName: 'Sample Group To Show'
          }
        ]
      };

      let newId = id + 1;
      this.setState({users});
      this.setState({idNum: newId});
      this.setState({currentUser: user});
      this.toggleLoggedIn();
    } else {
      alert('One of the fields is empty');
    }
  }

  /*
  * function Signs in a user
  * @param {string} userName of the user signing in
  * @param {password} password of the user signing in
  */
  signInUser(userName, password) {
    
    if (userName.length > 0 && password.length > 0) {
      if (this.state.users.length > 0){
        this.state.users.map((user, i) => {
          if (user.userName == userName && user.password == password){
            this.toggleLoggedIn();
            this.loadUser(user);
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
          <NavBar logout={this.toggleLoggedIn} />
          <BroadPage user={this.state.currentUser} />
          
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