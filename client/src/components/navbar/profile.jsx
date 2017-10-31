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
      <div className="container profile profileBody">
        <h3 className="center teal-text text-darken-4" id="profileName">Profile</h3>
        <div className="row">
          <div className="col s2" />
          <div className="col s8">
            <ul className="collection profileTable">
              <li className="collection-item avatar">
                <img
                  className="circle"
                  alt="PostIt Logo"
                  src="https://github.com/fob413/PostIt/blob/chore/feedback/client/src/image/nameNew.png?raw=true"
                />
                <span>User Name</span>
                <p>{this.state.username}</p>
              </li>
              <li className="collection-item avatar">
                <img
                  className="circle"
                  alt="PostIt Logo"
                  src="https://github.com/fob413/PostIt/blob/chore/feedback/client/src/image/mailNew.png?raw=true"
                />
                <span>Email</span>
                <p>{this.state.email}</p>
              </li>
              <li className="collection-item avatar">
                <img
                  className="circle"
                  alt="PostIt Logo"
                  src="https://github.com/fob413/PostIt/blob/chore/feedback/client/src/image/phoneNew.png?raw=true"
                />
                <span>Phone Number</span>
                <p>{this.state.telephone}</p>
              </li>
            </ul>
          </div>
        </div>
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
