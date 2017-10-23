import React, { PropTypes } from 'react';
import { Link, withRouter } from 'react-router-dom';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import { signUserUp } from '../../../actions/authActions';


/**
 * @class SignUp
 * @extends {React.Component}
 */
class SignUp extends React.Component {

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
      this.props.history.push('/broadpage');
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
      this.props.history.push('/broadpage');
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
      this.state.password.length > 7
    ) {
      if (!isNaN(this.state.telephone)) {
        this.props.signUserUp(this.state).then((res) => {
          if (res) {
            this.props.history.push('/broadpage');
          }
        });
      } else {
        swal('Oops...', 'Please input a valid telephone number', 'error');
      }
    } else {
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
            src={require("./../../../image/postitD.png")} // eslint-disable-line
            alt="PostIt Logo"
          />
        </div>

        <div className="row">
          <div className="container col s12">
            <form>
              <div className="row">
                <div className="input-field col s12 m6">
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

                <div className="input-field col s12 m6">
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

                <div className="input-field col s6 m6">
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

                <div className="input-field col s6 m6">
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

              </div>

              <div className="row center-align">
                <button
                  className="btn-large green darken-4 waves effect"
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
            <Link className="green-text text-darken-1 signButton" to="SignIn">Sign In</Link>
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
