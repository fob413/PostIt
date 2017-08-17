import React, {PropTypes} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { signUserIn, reloadUserIn } from '../../../actions/authActions';
import jwt from 'jsonwebtoken';
import {secret} from '../../config.js';
import { authenticateUser } from '../../auth';


// const secret = process.env.SECRET_TOKEN;

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      UserName: '',
      password: ''
    };

    this.onChange = this.onChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentWillMount(){
    authenticateUser()
    .then(status=>{
      this.props.reloadUserIn(status.UserName, status.email, status.telephone);
      this.props.history.push('/broadpage');
    })
    .catch(err=>{
      console.log(err);
    
    });
    // if(localStorage.getItem('x-auth')){
    //   let token = localStorage.getItem('x-auth');
    //   jwt.verify(token, secret, (err, decoded) => {
    //     if (err) {
    //       console.log(`failed to decode ${err}`);
    //       localStorage.removeItem('x-auth');
    //       localStorage.removeItem('email');
    //       localStorage.removeItem('telephone');
    //       localStorage.removeItem('username');
    //     } else {
    //       this.props.history.push('/broadpage');
    //     }
    //   });
    // }
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
    });
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
            <a
              className="green-text text-darken-1 signButton"
            >
              <Link className="green-text text-darken-1" to="/">Sign Up</Link>
            </a>
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
