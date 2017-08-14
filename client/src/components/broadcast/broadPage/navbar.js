import React, {PropTypes} from 'react';

class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.userProfile = this.userProfile.bind(this);
  }

  userProfile(e) {
    e.preventDefault();
    this.props.toggleProfileBoard();
  }

  logoutUser(e){
    e.preventDefault();
    this.props.logout();
  }

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper green darken-4">
            <a className="brand-logo center" href="#">
              <img
                width="70px"
                alt="PostIt Logo"
                src={require("../../../image/postitL.png")}
              />
            </a>
            <ul className="left" id="nav-mobile">
              <li>
                <i
                  onClick={this.userProfile}
                  className="modal-trigger white-text material-icons hoverable logout"
                >
                  settings
                </i>
              </li>
            </ul>

            <ul className="right" id="nav-mobile">
              <li>
                <i onClick={this.logoutUser} className="material-icons white-text logout hoverable">exit_to_app</i>
              </li>
            </ul>
          </div>
        </nav>  
      </div>
    )
  }
}

/*
* Validation of the components properties
*/
NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  toggleProfileBoard: PropTypes.func.isRequired
};

export default NavBar;