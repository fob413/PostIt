import React, { PropTypes } from 'react';
import swal from 'sweetalert2';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUserIn, reloadUserIn } from '../../../actions/authActions';
import validate from '../../../helpers/validate';


/**
 * @class Signin
 * @extends {React.Component}
 */
export class Signin extends React.Component {

  /**
   * Creates an instance of Signin.
   * @param {any} props
   * @memberof Signin
   */
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      isLoggedIn: this.props.auth.isLoggedIn
    };

    this.onChange = this.onChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }


  /**
   * @memberof Signin
   * @return {void}
   */
  componentDidMount() {
    if (this.props.auth.isLoggedIn) {
      this.props.history.push('/dashboard');
    }
  }


  /**
   * @param {any} nextProps
   * @memberof Signin
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      isLoggedIn: nextProps.auth.isLoggedIn
    });
    if (nextProps.auth.isLoggedIn) {
      this.props.history.push('/dashboard');
    }
  }


  /**
   * @param {any} event
   * @memberof Signin
   * @return {void}
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  /**
   * sign in a user function
   * @param {any} event
   * @memberof Signin
   * @return {void}
   */
  handleSignIn(event) {
    event.preventDefault();
    if (validate(this.state, 'signin')) {
      this.props.signUserIn(this.state).then((res) => {
        if (res) {
          this.props.history.push('/dashboard');
        }
      }, (err) => {
        swal('Oops', err.message, 'error');
      });
    }
  }


  /**
   * @memberof Signin
   * @return {void}
   */
  render() {
    return (
      <div className="container">
        <div className="row center-align">
          <img
            width="30%"
            src="https://github.com/fob413/PostIt/blob/chore/feedback/client/src/image/postItLogo.png?raw=true"
            alt="PostIt Logo"
          />
        </div>

        <div className="row">
          <div className="col s2" />
          <div className="container col s8">
            <form onSubmit={this.handleSignIn}>
              <div className="row">
                <div className="input-field col s12 m12">
                  <i className="material-icons prefix pink-text text-darken-4">
                    account_circle
                  </i>
                  <input
                    name="userName"
                    className="validate"
                    type="text"
                    id="userName"
                    data-error="wrong"
                    data-success="right"
                    onChange={this.onChange}
                    required
                  />
                  <label htmlFor="userName">
                    Username
                  </label>
                </div>

                <div className="input-field col s12 m12">
                  <i className="material-icons prefix pink-text text-darken-4">
                    lock
                  </i>
                  <input
                    name="password"
                    className="validate"
                    type="password"
                    id="password"
                    data-error="wrong"
                    data-success="right"
                    onChange={this.onChange}
                    required
                  />
                  <label htmlFor="password">
                    Password
                  </label>
                </div>

              </div>

              <div>
                <Link
                  className="pink-text text-darken-4"
                  to="/reset/password"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="row center-align">
                <button
                  className="btn-large pink darken-4 waves effect"
                  name="action"
                >
                  Sign In
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
            <Link className="pink-text text-darken-4 signButton" to="/">Sign Up</Link>
          </p>
        </div>
      </div>
    );
  }
}

Signin.propTypes = {
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  signUserIn: PropTypes.func.isRequired
};

const mapStateToProps = state => (
  {
    auth: state.Auth
  }
);


export default connect(
  mapStateToProps,
  { signUserIn, reloadUserIn }
)(withRouter(Signin));
