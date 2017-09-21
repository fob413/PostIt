import React from 'react';
import { connect } from 'react-redux';
import { authenticateUser } from '../../auth';
import { resetPassword, authToken } from '../../../actions/resetPassActions';
import { signUserIn } from '../../../actions/authActions';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: this.props.auth.isLoggedIn,
      UserName: ''
    };

    this.onChangePassword = this.onChangePassword.bind(this);
  }

  componentDidMount(){
    if (this.props.auth.isLoggedIn) {
      this.props.history.push('/broadpage');
    }
    this.props.authToken(this.props.match.params.token)
    .then(res => {
      if (!res.success){
        this.props.history.push('/');
      }
      this.setState({
        UserName: res.UserName
      });
    }, err => {
      console.log(err.message);
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isLoggedIn: nextProps.auth.isLoggedIn
    });
    if (nextProps.auth.isLoggedIn) {
      this.props.history.push('/broadpage');
    }
  }

  onChangePassword(e) {
    e.preventDefault();
    const { _newPassword, _confirmPassword } = this.refs;
    if (_newPassword && _newPassword.value.length > 7
      && _confirmPassword && _confirmPassword.value.length > 7
      && _newPassword.value == _confirmPassword.value){
         this.props.resetPassword(
           this.props.match.params.token,
           _newPassword.value, 
           _confirmPassword.value
          ).then((res) => {
            if (res.success){
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
  

  render () {
    return (
      <div className="conatainer">
        <div className="row center-align">
          <img
            width="20%"
            src={require("../../../image/postitD.png")}
            alt="PostIT Logo"
          />
        </div>

        <div className="row">
          <div className="col s12 m2"></div>
          <div className="col s12 m8">
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
                    <div className="col s3 m3"></div>
                    <div>
                      <button className="col s6 m6 center-align btn waves-effect waves-light green darken-4">
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

const mapStateToProps = state => (
  {
    auth: state.MyApp
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
