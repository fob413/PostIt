import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
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
            <form>
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

                <div className="input-field col s6 m6">
                  <input 
                    ref="_telephone"
                    className="validate"
                    type="tel"
                    id="telephone"
                    data-error="wrong"
                    data-success="right"
                  />
                  <label htmlFor="telephone">
                    Telephone
                  </label>
                </div>

                <div className="input-field col s6 m6">
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
              
              </div>

              <div className="row center-align">
                <button
                  className="btn-large green darken-4 waves effect"
                  type="submit"
                  name="action"
                >
                  Sign Up
                  <i className="material-icons right">send</i>
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
            >
            <Link className="green-text text-darken-1" to="SignIn">Sign In</Link>
            </a>
          </p>
        </div>

      </div>
    );
  }
}


export default SignUp;