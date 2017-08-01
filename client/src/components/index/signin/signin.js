import React from 'react';

class Signin extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row center-align">
          <img width="30%"
            src="./../../../../../template/image/postitD.png"
            alt="PostIt Logo" />
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
                  <a
                    className="white-text"
                    href="#"
                  >
                    Sign Up
                  </a>
                  <i className="material-icons right">
                    send
                  </i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}