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
          <nav>
            <div className="nav-wrapper green darken-4">

              <Link className="brand-logo center" to="/broadpage">
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
                      className="modal-trigger white-text material-icons hoverable logout"
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
                    className="material-icons white-text logout hoverable"
                  >
                    exit_to_app
                  </i>
                </li>
              </ul>
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
