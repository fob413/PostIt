import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.auth.UserName,
      email: this.props.auth.email,
      telephone: this.props.auth.telephone
    };
  }

  componentWillMount(){
    // if(localStorage.getItem('x-auth')){
    //   this.setState({
    //     username: this.props.auth.UserName,
    //     email: this.props.auth.email,
    //     telephone: this.props.auth.telephone
    //   }); 
    // } else {
    //   this.props.history.push('/signin');
    // }
    (!this.props.auth.isLoggedIn) &&
      this.props.history.push('/signin');
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.auth);
    this.setState({
      username: nextProps.auth.UserName,
      email: nextProps.auth.email,
      telephone: nextProps.auth.telephone
    });
    (!nextProps.auth.isLoggedIn) &&
      this.props.history.push('/signin');
  }

  render() {
    // console.log(this.state);
    return (
      <div className="container profile">
        <ul className="collection">
          <li className="collection-item avatar">
            <img
              className="circle"
              alt="PostIt Logo"
              src={require("../../image/name.png")}
              />
            <span>User Name</span>
            <p>{this.state.username}</p>
          </li>
          <li className="collection-item avatar">
            <img
              className="circle"
              alt="PostIt Logo"
              src={require("../../image/mail.png")}
              />
            <span>Email</span>
            <p>{this.state.email}</p>
          </li>
          <li className="collection-item avatar">
            <img
              className="circle"
              alt="PostIt Logo"
              src={require("../../image/number.png")}
              />
            <span>Phone Number</span>
            <p>{this.state.telephone}</p>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    auth: state.MyApp
  }
);

export default connect(mapStateToProps, {})(Profile);
