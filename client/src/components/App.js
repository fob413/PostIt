import React, {PropTypes} from 'react';
import Signup from './index/signup/signup';
import Signin from './index/signin/signin';
import '../style/style.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      signup: true,
      loggedIn: false
    };

    this.toggleLoggedIn = this.toggleLoggedIn.bind(this);
    this.toggleSignUp = this.toggleSignUp.bind(this);
  }

  toggleLoggedIn(e) {
    e.preventDefault;
    if (this.state.loggedIn){
      this.setState({loggedIn: false});
    } else {
      this.setState({loggedIn: true});
    }
  }

  toggleSignUp(e) {
    e.preventDefault;
    alert('toggle signup button has been clicked');
    if (this.state.signup) {
      this.setState({signup: false});
    } else {
      this.setState({signup: true});
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
            <Signup toggleSignUp={this.toggleSignUp} />
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