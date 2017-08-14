import React, {PropTypes} from 'react';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }
  render() {
    return (
      <div className="container profile">
        <ul className="collection">
          <li className="collection-item avatar">
            <img
              className="circle"
              alt="PostIt Logo"
              src={require("../../../image/name.png")}
              />
            <span>User Name</span>
            <p>{this.store.getState().UserName}</p>
          </li>
          <li className="collection-item avatar">
            <img
              className="circle"
              alt="PostIt Logo"
              src={require("../../../image/mail.png")}
              />
            <span>Email</span>
            <p>{this.store.getState().email}</p>
          </li>
          <li className="collection-item avatar">
            <img
              className="circle"
              alt="PostIt Logo"
              src={require("../../../image/number.png")}
              />
            <span>Phone Number</span>
            <p>{this.store.getState().telephone}</p>
          </li>
        </ul>
      </div>
    );
  }
}

export default Profile;
