import React, {PropTypes} from 'react';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      telephone: ''
    };
  }

  componentWillMount(){
    if(localStorage.getItem('x-auth')){
      this.setState({
        username: localStorage.getItem('username'),
        email: localStorage.getItem('email'),
        telephone: localStorage.getItem('telephone')
      }); 
    }
  }
  render() {
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

export default Profile;
