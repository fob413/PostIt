import React, {PropTypes} from 'react';

class Profile extends React.Component {
  constructor(props) {
    super(props);
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
            <p>[Placeholder for user name]</p>
          </li>
          <li className="collection-item avatar">
            <img
              className="circle"
              alt="PostIt Logo"
              src={require("../../image/mail.png")}
              />
            <span>Email</span>
            <p>[Placeholder for user email]</p>
          </li>
          <li className="collection-item avatar">
            <img
              className="circle"
              alt="PostIt Logo"
              src={require("../../image/number.png")}
              />
            <span>Phone Number</span>
            <p>[Placeholder for user phone number]</p>
          </li>
        </ul>
      </div>
    );
  }
}

export default Profile;
