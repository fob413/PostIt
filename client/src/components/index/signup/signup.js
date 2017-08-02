import React from 'react';
import {Link} from 'react-router';

class Signup extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row center-align">
          <img width="30%" 
            src="./../../../image/postitD.png"
            alt="PostIt Logo"
          />
        </div>

        <div className="row">
          <div className="container col s12">
            <form>
              <div className="row">
                <div className="input-field col s12 m6">
                  <input
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
          <br />
          <br />
          <p>
            OR
            <br />
            <a className="green-text text-darken-1" onClick={this.props.toggleSignUp}>Sign In</a>
          </p>
        </div>
      </div>
    );
  }
}

export default Signup;