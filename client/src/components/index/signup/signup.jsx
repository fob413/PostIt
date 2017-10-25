import React, { PropTypes } from 'react';
import { Link, withRouter } from 'react-router-dom';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import { signUserUp } from '../../../actions/authActions';


/**
 * @class SignUp
 * @extends {React.Component}
 */
export class SignUp extends React.Component {

  /**
   * Creates an instance of SignUp.
   * @param {any} props
   * @memberof SignUp
   */
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      telephone: '',
      password: '',
      confirmPassword: '',
      isLoggedIn: this.props.auth.isLoggedIn
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  /**
   * @memberof SignUp
   * @return {void}
   */
  componentDidMount() {
    if (this.props.auth.isLoggedIn) {
      this.props.history.push('/dashboard');
    }
  }


  /**
   * @param {any} nextProps
   * @memberof SignUp
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
   * change in input field updates state
   * @param {any} event
   * @memberof SignUp
   * @return {void}
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  /**
   * signup user
   * @param {any} event
   * @memberof SignUp
   * @return {void}
   */
  handleSubmit(event) {
    event.preventDefault();
    if (
      this.state.userName &&
      this.state.email &&
      this.state.telephone &&
      this.state.password &&
      this.state.password.length > 7 &&
      this.state.confirmPassword.length &&
      this.state.password === this.state.confirmPassword
    ) {
      if (!isNaN(this.state.telephone)) {
        this.props.signUserUp(this.state).then((res) => {
          if (res) {
            this.props.history.push('/dashboard');
          }
        });
      } else {
        swal('Oops...', 'Please input a valid telephone number', 'error');
      }
    } else {
      if ((this.state.password === this.state.confirmPassword) !== true) {
        swal('Oops...', 'Please confirm your password', 'error');
      }
      swal('Oops...', 'Please input a password of at least 8 characters', 'error');
    }
  }


  /**
   * @memberof SignUp
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
          <div className="col s8">
            <form>
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
                  />
                  <label htmlFor="userName">
                    Username
                  </label>
                </div>

                <div className="input-field col s12 m12">
                  <i className="material-icons prefix pink-text text-darken-4">
                    email
                  </i>
                  <input
                    name="email"
                    className="validate"
                    type="email"
                    id="email"
                    data-error="wrong"
                    data-success="right"
                    onChange={this.onChange}
                  />
                  <label htmlFor="email">
                    Email
                  </label>
                </div>

                <div className="input-field col s12 m12">
                  <i className="material-icons prefix pink-text text-darken-4">
                    contact_phone
                  </i>
                  <input
                    name="telephone"
                    className="validate"
                    type="tel"
                    id="telephone"
                    data-error="wrong"
                    data-success="right"
                    onChange={this.onChange}
                  />
                  <label htmlFor="telephone">
                    Telephone
                  </label>
                </div>

                <div className="input-field col s12 m6">
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
                  />
                  <label htmlFor="password">
                    Password
                  </label>
                </div>

                <div className="input-field col s12 m6">
                  <i className="material-icons prefix pink-text text-darken-4">
                    lock
                  </i>
                  <input
                    name="confirmPassword"
                    className="validate"
                    type="password"
                    id="confirmPassword"
                    data-error="wrong"
                    data-success="right"
                    onChange={this.onChange}
                  />
                  <label htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                </div>

              </div>

              <div className="row center-align">
                <button
                  className="btn-large  pink darken-4 waves effect"
                  name="action"
                  onClick={this.handleSubmit}
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
            <Link className="pink-text text-darken-4 signButton" to="SignIn">Sign In</Link>
          </p>
        </div>

      </div>
    );
  }
}

SignUp.propTypes = {
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  signUserUp: PropTypes.func.isRequired
};

const mapStateToProps = state => (
  {
    auth: state.Auth
  }
);

export default connect(
  mapStateToProps,
  { signUserUp }
)(withRouter(SignUp));
