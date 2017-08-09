import React, {PropTypes} from 'react';
import {Link} from 'react-router';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    
    this.onSignUp = this.onSignUp.bind(this);
  }

  /*
  * function signs up a new user
  * @param {string} _userName is the intending users name
  * @param {string} _email is the intending users mail
  * @param {password} _password is the intending users password
  */
  onSignUp(e) {
    const {_userName, _email, _password} = this.refs;
    e.preventDefault();
    if (_userName.value.length > 0 && _email.value.length && _password.value.length > 0) {
      this.props.signUpUser(_userName.value, _email.value, _password.value);
    } else {
      console.log('One of the fields in the form is empty');
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row center-align">
          <img width="30%" 
            src={require("./../../../image/postitD.png")}
            alt="PostIt Logo"
          />
        </div>

        <div className="row">
          <div className="container col s12">
            <form onSubmit={this.onSignUp}>
              <div className="row">
                <div className="input-field col s12 m6">
                  <input
                    ref="_userName"
                    className="validate"
                    type="text"
                    id="userName"
                    data-error="wrong"
                    data-success="right"
                  />
                  <label htmlFor="userName">
                    Username
                  </label>
                </div>

                <div className="input-field col s12 m6">
                  <input
                    ref="_email"
                    className="validate"
                    type="email"
                    id="email"
                    data-error="wrong"
                    data-success="right"
                  />
                  <label htmlFor="email">
                    Email
                  </label>
                </div>
              </div>

              <div className="input-field col s12 m12">
                <input 
                  ref="_password"
                  className="validate"
                  type="password"
                  id="password"
                  data-error="wrong"
                  data-success="right"
                />
                <label htmlFor="password">
                  Password
                </label>
              </div>

              <div className="row center-align">
                <button
                  className="btn-large green darken-4 waves effect"
                  type="submit"
                  name="action"
                >
                  Sign Up
                </button>
              </div>

            </form>
          </div>
        </div>
        <div className="center-align">
          <p>
            OR
            <br />
            <a
              className="green-text text-darken-1 signButton"
              onClick={this.props.toggleSignUp}
            >
            Sign In
            </a>
          </p>
        </div>
      </div>
    );
  }
}

/*
* Validation of the components properties
*/
Signup.propTypes ={
  toggleSignUp: PropTypes.func.isRequired,
  signUpUser: PropTypes.func.isRequired
};

export default Signup;