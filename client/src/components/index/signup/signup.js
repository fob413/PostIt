import React, {PropTypes} from 'react';
import {Link} from 'react-router';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    
    this.onSignUp = this.onSignUp.bind(this);
  }

  onSignUp(e) {
    const {_userName, _email, _password} = this.refs;
    e.preventDefault();
    alert(`submit signup form:\nUserName: ${_userName.value} \nEmail: ${_email.value} \nPassword: ${_password.value}`);
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
            <a className="green-text text-darken-1 signButton" onClick={this.props.toggleSignUp}>Sign In</a>
          </p>
        </div>
      </div>
    );
  }
}

Signup.propTypes ={
  toggleSignUp: PropTypes.func.isRequired
};

export default Signup;