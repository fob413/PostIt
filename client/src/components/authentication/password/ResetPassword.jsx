import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert2';
import { resetPassword, authToken } from '../../../actions/passwordActions';
import { signUserIn } from '../../../actions/authActions';


/**
 * @class ResetPassword
 * @extends {React.Component}
 */
export class ResetPassword extends React.Component {

  /**
   * Creates an instance of ResetPassword.
   * @param {any} props
   * @memberof ResetPassword
   */
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: this.props.auth.isLoggedIn,
      userName: '',
      newPassword: '',
      confirmPassword: ''
    };

    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChange = this.onChange.bind(this);
  }


  /**
   * @memberof ResetPassword
   * @return {void}
   */
  componentDidMount() {
    if (this.props.auth.isLoggedIn) {
      this.props.history.push('/broadpage');
    }
    this.props.authToken(this.props.match.params.token)
    .then((res) => {
      if (!res.success) {
        this.props.history.push('/');
      }
      this.setState({
        userName: res.userName
      });
    }, (err) => {
      swal('Oops...', err.message, 'error');
    });
  }


  /**
   * @param {any} nextProps
   * @memberof ResetPassword
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
   * @memberof ResetPassword
   * @return {void}
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  /**
   * function to handle call to api that changes password
   * @param {any} event
   * @memberof ResetPassword
   * @return {void}
   */
  onChangePassword(event) {
    event.preventDefault();
    const { newPassword, confirmPassword } = this.state;
    if (newPassword && newPassword.length > 7
      && confirmPassword && confirmPassword.length > 7
      && newPassword === confirmPassword) {
      this.props.resetPassword(
           this.props.match.params.token,
           newPassword,
           confirmPassword
          ).then((res) => {
            if (res.success) {
              this.props.history.push('/signin');
            } else {
              this.props.history.push('/');
            }
          });
    } else {
      Materialize.toast(
        'Invalid Password or Passwords do not match',
        4000,
        'red darken-4');
    }
  }


  /**
   * @memberof ResetPassword
   * @return {void}
   */
  render() {
    return (
      <div className="conatainer">
        <div className="row center-align">
          <img
            width="20%"
            src="https://github.com/fob413/PostIt/blob/chore/feedback/client/src/image/postItLogo.png?raw=true"
            alt="PostIT Logo"
          />
        </div>

        <div className="row">
          <div className="col s12 m3" />
          <div className="col s12 m6">
            <div className="card">
              <div className="card-content">
                <h5 className="center-align">Password Recovery</h5>
                <p className="center-align">Welcome back {this.state.userName}. Enter Your New Password</p>

                <form onSubmit={this.onChangePassword}>
                  <div className="row">
                    <div className="col s12">
                      <div className="input-field inline col s12">
                        <label>New Password</label>
                        <input
                          ref="_newPassword"
                          type="password"
                          name="newPassword"
                          value={this.state.newPassword}
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12">
                      <div className="input-field inline col s12">
                        <label>Confirm Password</label>
                        <input
                          ref="_confirmPassword"
                          type="password"
                          name="confirmPassword"
                          value={this.state.confirmPassword}
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col s3 m3" />
                    <div>
                      <button
                        className="col s6 m6 center-align btn waves-effect waves-light pink darken-4"
                      >
                        Change Password
                      </button>
                    </div>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  authToken: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  resetPassword: PropTypes.func.isRequired
};

const mapStateToProps = state => (
  {
    auth: state.Auth
  }
);

export default connect(
  mapStateToProps,
  {
    authToken,
    resetPassword,
    signUserIn
  }
)(ResetPassword);
