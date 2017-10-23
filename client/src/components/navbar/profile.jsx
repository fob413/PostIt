import React, { PropTypes } from 'react';
import { connect } from 'react-redux';


/**
 * @class Profile
 * @extends {React.Component}
 */
class Profile extends React.Component {

  /**
   * Creates an instance of Profile.
   * @param {any} props
   * @memberof Profile
   */
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.auth.userName,
      email: this.props.auth.email,
      telephone: this.props.auth.telephone
    };
  }


  /**
   * @memberof Profile
   * @return {void}
   */
  componentWillMount() {
    (!this.props.auth.isLoggedIn) &&
      this.props.history.push('/signin');
  }


  /**
   * @param {any} nextProps
   * @memberof Profile
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      username: nextProps.auth.userName,
      email: nextProps.auth.email,
      telephone: nextProps.auth.telephone
    });
    (!nextProps.auth.isLoggedIn) &&
      this.props.history.push('/signin');
  }


  /**
   * @memberof Profile
   * @return {void}
   */
  render() {
    // console.log(this.state);
    return (
      <div className="container profile">
        <ul className="collection">
          <li className="collection-item avatar">
            <img
              className="circle"
              alt="PostIt Logo"
              src={require("../../image/name.png")} // eslint-disable-line
            />
            <span>User Name</span>
            <p>{this.state.username}</p>
          </li>
          <li className="collection-item avatar">
            <img
              className="circle"
              alt="PostIt Logo"
              src={require("../../image/mail.png")} // eslint-disable-line
            />
            <span>Email</span>
            <p>{this.state.email}</p>
          </li>
          <li className="collection-item avatar">
            <img
              className="circle"
              alt="PostIt Logo"
              src={require("../../image/number.png")} // eslint-disable-line
            />
            <span>Phone Number</span>
            <p>{this.state.telephone}</p>
          </li>
        </ul>
      </div>
    );
  }
}

/*
* Validation of the components properties
*/
Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => (
  {
    auth: state.Auth
  }
);

export default connect(mapStateToProps, {})(Profile);
