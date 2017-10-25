import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { resetPassword, authToken } from '../../../actions/resetPassActions';
import { signUserIn } from '../../../actions/authActions';


/**
 * @class ResetPassword
 * @extends {React.Component}
 */
class ResetPassword extends React.Component {

  /**
   * Creates an instance of ResetPassword.
   * @param {any} props
   * @memberof ResetPassword
   */
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: this.props.auth.isLoggedIn,
      UserName: ''
    };

    this.onChangePassword = this.onChangePassword.bind(this);
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
        UserName: res.UserName
      });
    }, (err) => {
      console.log(err.message);
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
   * function to handle call to api that changes password
   * @param {any} event
   * @memberof ResetPassword
   * @return {void}
   */
  onChangePassword(event) {
    event.preventDefault();
    const { _newPassword, _confirmPassword } = this.refs;
    if (_newPassword && _newPassword.value.length > 7
      && _confirmPassword && _confirmPassword.value.length > 7
      && _newPassword.value === _confirmPassword.value) {
      this.props.resetPassword(
           this.props.match.params.token,
           _newPassword.value,
           _confirmPassword.value
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
                <p className="center-align">Welcome back {this.state.UserName}. Enter Your New Password</p>

                <form onSubmit={this.onChangePassword}>
                  <div className="row">
                    <div className="col s12">
                      <div className="input-field inline col s12">
                        <label>New Password</label>
                        <input ref="_newPassword" type="password" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12">
                      <div className="input-field inline col s12">
                        <label>Confirm Password</label>
                        <input ref="_confirmPassword" type="password" />
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
