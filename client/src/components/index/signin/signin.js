import React, {PropTypes} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { signUserIn, reloadUserIn } from '../../../actions/authActions';
import { authenticateUser } from '../../auth';



class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      UserName: '',
      password: '',
      isLoggedIn: this.props.auth.isLoggedIn
    };

    this.onChange = this.onChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isLoggedIn){
      this.props.history.push('/broadpage');
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      isLoggedIn: nextProps.auth.isLoggedIn
    });
    if (nextProps.auth.isLoggedIn) {
      this.props.history.push('/broadpage');
    }
  }

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  handleSignIn(e){
    e.preventDefault();
    this.props.signUserIn(this.state).then((res) => {
      if (res) {
        this.props.history.push('/broadpage');
      }
    }, err => console.log(err));
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
            <form>
              <div className="row">
                <div className="input-field col s12 m12">
                  <input
                    name="UserName"
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
                <Link className="green-text text-darken-1" to="/reset/password">Forgot Password?</Link>
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

const mapStateToProps = state => (
  {
    auth: state.MyApp
  }
);


export default connect(
  mapStateToProps, 
  { signUserIn, reloadUserIn }
)(withRouter(Signin));
