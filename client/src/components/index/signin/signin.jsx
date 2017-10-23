import React, { PropTypes } from 'react';
import swal from 'sweetalert2';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUserIn, reloadUserIn } from '../../../actions/authActions';


/**
 * @class Signin
 * @extends {React.Component}
 */
class Signin extends React.Component {

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
      this.props.history.push('/broadpage');
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
      this.props.history.push('/broadpage');
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
    this.props.signUserIn(this.state).then((res) => {
      if (res) {
        this.props.history.push('/broadpage');
      }
    }, (err) => {
      swal('Oops', err.message, 'error');
    });
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
            src={require("./../../../image/postitD.png")} // eslint-disable-line
            alt="PostIt Logo"
          />
        </div>

        <div className="row">
          <div className="container col s12">
            <form>
              <div className="row">
                <div className="input-field col s12 m12">
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

              <div>
                <Link
                  className="green-text text-darken-1"
                  to="/reset/password"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="row center-align">
                <button
                  className="btn-large green darken-4 waves effect"
                  name="action"
                  onClick={this.handleSignIn}
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
            <Link className="green-text text-darken-1 signButton" to="/">Sign Up</Link>
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
