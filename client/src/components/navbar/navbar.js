import React, {PropTypes} from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props){
    super(props);
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
                src={require("../../image/postitL.png")}
              />
            </a>
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
                <i className="material-icons white-text logout hoverable">exit_to_app</i>
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
};

export default NavBar;