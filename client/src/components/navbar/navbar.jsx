import React, { PropTypes } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUserOut } from '../../actions/authActions';
import { unloadGroups } from '../../actions/groupsActions';


/**
 * @class NavBar
 * @extends {React.Component}
 */
class NavBar extends React.Component {

  /**
   * Creates an instance of NavBar.
   * @param {any} props
   * @memberof NavBar
   */
  constructor(props) {
    super(props);
    this.state = {
      isAuth: this.props.auth.isLoggedIn
    };

    this.onSignOut = this.onSignOut.bind(this);
  }


  /**
   * @param {any} nextProps
   * @memberof NavBar
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      isAuth: nextProps.auth.isLoggedIn
    });
    if (!nextProps.auth.isLoggedIn) {
      this.props.history.push('/signin');
    }
  }


  /**
   * log the user out of the platform
   * @param {any} event
   * @memberof NavBar
   * @return {void}
   */
  onSignOut(event) {
    event.preventDefault();
    this.props.signUserOut()
    .then((res) => {
      this.props.unloadGroups();
      if (res) {
        this.setState({
          isAuth: false
        });
        // this.props.unloadGroups();
        this.props.history.push('/signin');
      }
    });
  }


  /**
   * @memberof NavBar
   * @return {void}
   */
  render() {
    const { isAuth } = this.state;
    return (
      <div>
        {isAuth && (
          <nav className="teal darken-4">
            <div className="container">
              <div className="nav-wrapper">

                <Link className="brand-logo center hoverable" to="/dashboard">
                  <img
                    width="70px"
                    alt="PostIt Logo"
                    src={require("../../image/postitL.png")} // eslint-disable-line
                  />
                </Link>

                <ul className="left" id="nav-mobile">
                  <li>
                    <Link to="/profile">
                      <i
                        className="white-text material-icons hoverable logout"
                      >
                        settings
                      </i>
                    </Link>
                  </li>
                </ul>

                <ul className="right" id="nav-mobile">
                  <li>
                    <i // eslint-disable-line
                      onClick={this.onSignOut}
                      className="white-text material-icons hoverable logout"
                    >
                      exit_to_app
                    </i>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        )}
      </div>
    );
  }
}

/*
* Validation of the components properties
*/
NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  signUserOut: PropTypes.func.isRequired,
  unloadGroups: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    auth: state.Auth,
    groups: state.Groups
  }
);

export default connect(mapStateToProps, { signUserOut, unloadGroups })(withRouter(NavBar));
