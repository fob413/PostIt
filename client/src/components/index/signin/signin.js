import React, {PropTypes} from 'react';

class Signin extends React.Component {
  constructor(props) {
    super(props);

    this.onSignIn = this.onSignIn.bind(this);
  }

  onSignIn(e) {
    const {_userName, _password} = this.refs;
    e.preventDefault();
    if (_userName.value.length > 0 && _password.value.length > 0) {
      this.props.signInUser(_userName.value, _password.value);
    } else {
      console.log(`Some fields are empty.`);
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
            <form onSubmit={this.onSignIn}>
              <div className="row">
                <div className="input-field col s12 m12">
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
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="center-align">
          <p>
            OR
            <br />
            <a className="green-text text-darken-1 signButton" onClick={this.props.toggleSignUp}>Sign Up</a>
          </p>
        </div>
      </div>
    );
  }
}

Signin.propTypes ={
  toggleSignUp: PropTypes.func.isRequired,
  signInUser: PropTypes.func.isRequired
};

export default Signin; 