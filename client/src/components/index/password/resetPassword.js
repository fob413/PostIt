import React from 'react';
import { connect } from 'react-redux';
import { authenticateUser } from '../../auth';

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: this.props.auth.isLoggedIn
    };
  }

  componentDidMount(){
    if (this.props.auth.isLoggedIn) {
      this.props.history.push('/broadpage');
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isLoggedIn: nextProps.auth.isLoggedIn
    });
    if (nextProps.auth.isLoggedIn) {
      this.props.history.push('/broadpage');
    }
  }
  

  render () {
    return (
      <div className="conatainer">
        <div className="row center-align">
          <img
            width="30%"
            src={require("../../../image/postitD.png")}
            alt="PostIT Logo"
          />
        </div>

        <div className="row">
          <div className="col s12 m7">
            <div className="card">
              <div className="card-content">
                <p>Password Recovery</p>
                <p>Welcome back UserName</p>
                <p>In the fields below, enter your new password</p>

                <form>
                  <div className="row">
                    <div className="col s12">
                      New Password
                      <div className="input-field inline">
                        <label>New Password</label>
                        <input type="password" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s12">
                      Confirm Password
                      <div className="input-field inline">
                        <label>Confirm Password</label>
                        <input type="password" />
                      </div>
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

export default connect(mapStateToProps, {})(ResetPassword);
